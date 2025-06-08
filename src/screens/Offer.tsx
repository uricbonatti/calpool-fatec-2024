import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { SelectInput } from '@components/SelectInput';
import { publishRideMock } from '@mocks/api.mock';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
  rideType: 'ida' | 'volta' | 'ida-volta';
  recurrence: 'once' | 'daily' | 'weekly';
  vehicleId: string;
  arrivalTime?: string;
  departureTime?: string;
  notes?: string;
};

export function Offer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      rideType: 'ida',
      recurrence: 'once',
    },
  });

  const rideType = watch('rideType');

  // Mock - substituir por chamada à API
  const mockVehicles = [
    { id: '1', model: 'Fiat Uno', plate: 'ABC1D23' },
    { id: '2', model: 'VW Gol', plate: 'XYZ9E87' },
  ];

  const handlePublish = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await publishRideMock(data);

      toast.show({
        title: 'Carona publicada com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigation.goBack();
    } catch (error) {
      toast.show({
        title: 'Erro ao publicar carona',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <VStack flex={1}>
        <ScreenHeader
          title="Confirmar Carona"
          showBackButton
          onBackPress={() => setShowConfirmation(false)}
        />

        <VStack px={5} space={4} flex={1}>
          <Heading fontSize="lg" mb={2}>
            Resumo da Carona
          </Heading>

          <VStack space={2}>
            <HStack justifyContent="space-between">
              <Text color="gray.300">Tipo</Text>
              <Text fontFamily="heading">
                {watch('rideType') === 'ida' ? 'Ida' : 'Volta'}
              </Text>
            </HStack>

            <HStack justifyContent="space-between">
              <Text color="gray.300">Recorrência</Text>
              <Text fontFamily="heading">
                {watch('recurrence') === 'once'
                  ? 'Única'
                  : watch('recurrence') === 'daily'
                    ? 'Diária'
                    : 'Semanal'}
              </Text>
            </HStack>

            <HStack justifyContent="space-between">
              <Text color="gray.300">Veículo</Text>
              <Text fontFamily="heading">
                {mockVehicles.find((v) => v.id === watch('vehicleId'))?.model ||
                  'Não selecionado'}
              </Text>
            </HStack>
          </VStack>

          <Divider bg="gray.500" my={2} />

          <Box flex={1} justifyContent="center">
            <Center>
              <Text color="gray.400">Mapa da rota apareceria aqui</Text>
            </Center>
          </Box>

          <Button
            title="Confirmar Publicação"
            onPress={handleSubmit(handlePublish)}
            isLoading={isSubmitting}
            mt={4}
          />
        </VStack>
      </VStack>
    );
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Oferecer Carona" />

      <ScrollView px={6} showsVerticalScrollIndicator={false}>
        {/* Mapa Preview */}
        <Box
          bg="gray.600"
          h="120px"
          mb={4}
          rounded="md"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="gray.300">Mapa com rota do seu perfil para Fatec</Text>
        </Box>

        <VStack space={4} pb={8}>
          {/* Tipo de Carona */}
          <Controller
            control={control}
            name="rideType"
            render={({ field: { onChange, value } }) => (
              <SelectInput
                label="Tipo de Carona"
                selectedValue={value}
                onValueChange={onChange}
              >
                <SelectInput.Item label="Somente Ida" value="ida" />
                <SelectInput.Item label="Somente Volta" value="volta" />
                <SelectInput.Item label="Ida e Volta" value="ida-volta" />
              </SelectInput>
            )}
          />

          {/* Recorrência */}
          <Controller
            control={control}
            name="recurrence"
            render={({ field: { onChange, value } }) => (
              <SelectInput
                label="Recorrência"
                selectedValue={value}
                onValueChange={onChange}
              >
                <SelectInput.Item label="Uma vez" value="once" />
                <SelectInput.Item label="Todo dia" value="daily" />
                <SelectInput.Item label="Dias específicos" value="weekly" />
              </SelectInput>
            )}
          />

          {/* Veículo */}
          <Controller
            control={control}
            name="vehicleId"
            render={({ field: { onChange } }) => (
              <SelectInput label="Veículo" onValueChange={onChange}>
                {mockVehicles.map((vehicle) => (
                  <SelectInput.Item
                    key={vehicle.id}
                    label={`${vehicle.model} (${vehicle.plate})`}
                    value={vehicle.id}
                  />
                ))}
              </SelectInput>
            )}
          />

          {/* Horários Dinâmicos */}
          {rideType !== 'volta' && (
            <Controller
              control={control}
              name="arrivalTime"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Horário de Chegada (Fatec)"
                  placeholder="HH:MM"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          )}

          {(rideType === 'volta' || rideType === 'ida-volta') && (
            <Controller
              control={control}
              name="departureTime"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Horário de Saída (Fatec)"
                  placeholder="HH:MM"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          )}

          {/* Observações */}
          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Observações"
                placeholder="Ex: Ponto de encontro, bagagem, etc."
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={3}
              />
            )}
          />

          <Button title="Visualizar Resumo" onPress={handlePreview} mt={6} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
