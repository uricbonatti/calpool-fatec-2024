import { useNavigation } from '@react-navigation/native';
import {
  Center,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Modal,
  ScrollView,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import { Pencil, Plus, Trash } from 'phosphor-react-native';
import { useCallback, useEffect, useState } from 'react';

// Componentes
import { Button } from '@components/Button';
import { ErrorScreen } from '@components/ErrorScreen';
import { Input } from '@components/Input';
import { Loading } from '@components/Loading';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';

// Mocks e Utils
import { CreateVehicleDTO, VehicleDTO } from '@dtos';
import { useAuth } from '@hooks/useAuth';
import { addVehicleMock, fetchUserVehiclesMock } from '@mocks/api.mock';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

// Componente de Item de Veículo
const VehicleItem = ({
  vehicle,
  onRemove,
  onEdit,
}: {
  vehicle: VehicleDTO;
  onRemove: () => void;
  onEdit: () => void;
}) => {
  return (
    <HStack
      bg="gray.600"
      p={4}
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
      mb={2}
    >
      <VStack flex={1}>
        <Text color="white" fontFamily="heading">
          {vehicle.model}
        </Text>
        <Text color="gray.300" fontSize="sm">
          {vehicle.plate}
        </Text>
        {vehicle.year && (
          <Text color="gray.400" fontSize="xs">
            Ano: {vehicle.year}
          </Text>
        )}
      </VStack>

      <HStack space={2}>
        <IconButton
          icon={<Pencil size={20} color="#00B37E" />}
          onPress={onEdit}
        />
        <IconButton
          icon={<Trash size={20} color="#F75A68" />}
          onPress={onRemove}
        />
      </HStack>
    </HStack>
  );
};

export function Profile() {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclose();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  // Estados
  const [vehicles, setVehicles] = useState<VehicleDTO[]>([]);
  const [newVehicle, setNewVehicle] = useState<CreateVehicleDTO>({
    model: '',
    plate: '',
    userId: user.id,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carrega veículos
  const loadVehicles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchUserVehiclesMock(user.id);
      setVehicles(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar veículos'
      );
    } finally {
      setIsLoading(false);
    }
  }, [user.id]);

  // Adiciona veículo
  const handleAddVehicle = async () => {
    try {
      setIsLoading(true);
      const addedVehicle = await addVehicleMock(newVehicle);
      setVehicles((prev) => [...prev, addedVehicle]);
      setNewVehicle({ model: '', plate: '', userId: user.id });
      onClose();
    } catch (err) {
      setError('Erro ao adicionar veículo');
    } finally {
      setIsLoading(false);
    }
  };

  // Remove veículo
  const handleRemoveVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  // Edita veículo
  const handleEditVehicle = (vehicleId: string) => {
    navigation.navigate('editVehicle', { vehicleId });
  };

  // Efeito para carregar dados
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadVehicles);
    return unsubscribe;
  }, [navigation, loadVehicles]);

  // Renderização condicional
  if (isLoading && vehicles.length === 0) {
    return <Loading />;
  }

  if (error) {
    return <ErrorScreen message={error} onRetry={loadVehicles} />;
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        px={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 36 }}
      >
        {/* Seção Foto e Dados Básicos */}
        <Center mt={6} mb={8}>
          <UserPhoto
            size={33}
            source={{ uri: user.avatar }}
            alt="Foto do usuário"
          />
          <Heading mt={4} fontFamily="heading" color="gray.100">
            {user.name}
          </Heading>
          <Text color="gray.300">{user.email}</Text>
        </Center>

        {/* Seção Veículos */}
        <VStack mt={4} mb={4}>
          <HStack justifyContent="space-between" alignItems="center" mb={4}>
            <Heading fontSize="md" color="gray.200" fontFamily="heading">
              Meus Veículos
            </Heading>
            <Button
              title="Adicionar veículo"
              variant="link"
              leftIcon={<Plus size={16} color="#00B37E" />}
              onPress={onOpen}
              _text={{ color: 'green.500' }}
            />
          </HStack>

          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <VehicleItem
                key={vehicle.id}
                vehicle={vehicle}
                onRemove={() => handleRemoveVehicle(vehicle.id)}
                onEdit={() => handleEditVehicle(vehicle.id)}
              />
            ))
          ) : (
            <Text color="gray.400" textAlign="center" mt={4}>
              Nenhum veículo cadastrado
            </Text>
          )}
        </VStack>
      </ScrollView>

      {/* Modal de Adição */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Cadastrar Veículo</Modal.Header>
          <Modal.Body>
            <FormControl mb={4}>
              <Input
                placeholder="Modelo (ex: Fiat Uno)"
                value={newVehicle.model}
                onChangeText={(text) =>
                  setNewVehicle((prev) => ({ ...prev, model: text }))
                }
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Placa (ex: ABC1D23)"
                value={newVehicle.plate}
                onChangeText={(text) =>
                  setNewVehicle((prev) => ({
                    ...prev,
                    plate: text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase(),
                  }))
                }
                maxLength={7}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button
              title="Cancelar"
              variant="outline"
              onPress={onClose}
              mr={4}
            />
            <Button
              title="Salvar"
              onPress={handleAddVehicle}
              isLoading={isLoading}
              isDisabled={!newVehicle.model || !newVehicle.plate}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </VStack>
  );
}
