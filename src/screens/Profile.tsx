import { useNavigation } from '@react-navigation/native';
import {
  Box,
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
import { Camera, Pencil, Plus, Trash } from 'phosphor-react-native';
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
import { userVehicles } from '@mocks/user.mock';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

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

// ======================================
// NOVO COMPONENTE ADICIONADO
// ======================================
const ProfileSection = ({
  title,
  children,
  onEdit,
}: {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
}) => (
  <Box mb={6} position="relative">
    <HStack justifyContent="space-between" alignItems="center" mb={4}>
      <Heading fontSize="lg" color="gray.200" fontFamily="heading">
        {title}
      </Heading>
      {onEdit && (
        <IconButton
          icon={<Pencil size={18} color="#00B37E" />}
          onPress={onEdit}
          variant="ghost"
          _pressed={{ bg: 'gray.500' }}
        />
      )}
    </HStack>
    {children}
  </Box>
);
// ======================================

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <VStack space={1} mb={4}>
    <Text color="gray.300" fontSize="sm">
      {label}
    </Text>
    <Box bg="gray.600" p={3} rounded="md">
      <Text color="gray.100" fontSize="md">
        {value || 'Não informado'}
      </Text>
    </Box>
  </VStack>
);

export function Profile() {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclose();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [vehicles, setVehicles] = useState<VehicleDTO[]>([]);
  const [newVehicle, setNewVehicle] = useState<CreateVehicleDTO>({
    model: '',
    plate: '',
    userId: user?.id || '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVehicles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = userVehicles;
      setVehicles(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar veículos'
      );
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const handleAddVehicle = async () => {
    try {
      setIsLoading(true);
      const addedVehicle = {
        ...newVehicle,
        id: `vehicle-${Math.random().toString(36).substr(2, 9)}`,
        isPrimary: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setVehicles((prev) => [...prev, addedVehicle]);
      setNewVehicle({ model: '', plate: '', userId: user?.id || '' });
      onClose();
    } catch (err) {
      setError('Erro ao adicionar veículo');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadVehicles);
    return unsubscribe;
  }, [navigation, loadVehicles]);

  if (isLoading && vehicles.length === 0) return <Loading />;
  if (error) return <ErrorScreen message={error} onRetry={loadVehicles} />;

  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader title="Perfil" />

      <ScrollView px={5} showsVerticalScrollIndicator={false} pb={6}>
        {/* Seção Foto e Dados Básicos - MODIFICADA */}
        <Center mt={6} mb={6} position="relative">
          <Box position="relative">
            <UserPhoto
              size={33}
              source={{ uri: user?.avatar || '' }}
              alt="Foto do usuário"
            />
            <Center
              position="absolute"
              right={0}
              bottom={0}
              bg="green.500"
              rounded="full"
              p={2}
              borderWidth={2}
              borderColor="gray.700"
            >
              <Camera size={16} color="white" weight="fill" />
            </Center>
          </Box>
          <Heading mt={4} fontSize="xl" fontFamily="heading" color="gray.100">
            {user?.name || ''}
          </Heading>
          <Text color="gray.300" mt={1}>
            {user?.email || ''}
          </Text>
        </Center>

        {/* Seção Informações Pessoais - MODIFICADA */}
        <ProfileSection
          title="Informações Pessoais"
          onEdit={() => console.log('Editar informações pessoais')}
        >
          <ProfileField label="RA" value={user?.ra || 'Não informado'} />
          <ProfileField
            label="Telefone"
            value={user?.phone || 'Não informado'}
          />
        </ProfileSection>

        {/* Seção Endereço - MODIFICADA */}
        <ProfileSection
          title="Endereço"
          onEdit={() => console.log('Editar endereço')}
        >
          <ProfileField
            label="Logradouro"
            value={`${user?.address.street}, ${user?.address.number}`}
          />

          {user?.address.complement && (
            <ProfileField label="Complemento" value={user.address.complement} />
          )}

          <ProfileField
            label="Bairro"
            value={user?.address.neighborhood || 'Não informado'}
          />

          <HStack space={3}>
            <Box flex={1}>
              <ProfileField
                label="Cidade"
                value={user?.address.city || 'Não informado'}
              />
            </Box>
            <Box flex={1}>
              <ProfileField
                label="Estado"
                value={user?.address.state || 'NI'}
              />
            </Box>
          </HStack>

          <ProfileField
            label="CEP"
            value={user?.address.cep || 'Não informado'}
          />
        </ProfileSection>

        {/* Seção Veículos - MODIFICADA */}
        <ProfileSection title="Meus Veículos">
          <Button
            title="Adicionar veículo"
            variant="link"
            leftIcon={<Plus size={16} color="#00B37E" />}
            onPress={onOpen}
            _text={{ color: 'green.500', fontSize: 'sm' }}
            px={0}
            mb={4}
            alignSelf="flex-start"
          />

          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <VehicleItem
                key={vehicle.id}
                vehicle={vehicle}
                onRemove={() =>
                  setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id))
                }
                onEdit={() =>
                  navigation.navigate('editVehicle', { vehicleId: vehicle.id })
                }
              />
            ))
          ) : (
            <Box bg="gray.600" p={4} rounded="md">
              <Text color="gray.400" textAlign="center">
                Nenhum veículo cadastrado
              </Text>
            </Box>
          )}
        </ProfileSection>
      </ScrollView>

      {/* Modal de Adição de Veículo - PERMANECE IGUAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content bg="gray.600" maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header borderBottomWidth={0}>
            <Heading fontSize="md" color="gray.100">
              Cadastrar Veículo
            </Heading>
          </Modal.Header>
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
          <Modal.Footer bg="gray.600" borderTopWidth={0}>
            <Button
              title="Cancelar"
              variant="outline"
              onPress={onClose}
              mr={4}
              flex={1}
            />
            <Button
              title="Salvar"
              onPress={handleAddVehicle}
              isLoading={isLoading}
              isDisabled={!newVehicle.model || !newVehicle.plate}
              flex={1}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </VStack>
  );
}
