// src/screens/EditVehicle.tsx
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { VehicleDTO } from '@dtos';
import { updateVehicleMock } from '@mocks/api.mock';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { ScrollView, VStack } from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type RouteParams = {
  vehicleId: string;
};

export function EditVehicle() {
  const route = useRoute();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { vehicleId } = route.params as RouteParams;
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<VehicleDTO>({
    defaultValues: async () => {
      // Mock - substituir por chamada à API
      return {
        id: vehicleId,
        model: 'Fiat Uno',
        plate: 'ABC1D23',
        year: 2018,
        color: 'Branco',
        userId: 'user-123',
        isPrimary: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    },
  });

  const handleSave = async (data: VehicleDTO) => {
    try {
      setIsLoading(true);
      await updateVehicleMock(data);
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack flex={1}>
      <ScreenHeader title="Editar Veículo" showBackButton />

      <ScrollView px={5} showsVerticalScrollIndicator={false}>
        <VStack space={4} pb={8}>
          <Controller
            control={control}
            name="model"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Modelo"
                placeholder="Ex: Fiat Uno"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="plate"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Placa"
                placeholder="Ex: ABC1D23"
                value={value}
                onChangeText={(text) => onChange(text.toUpperCase())}
                maxLength={7}
              />
            )}
          />

          <Controller
            control={control}
            name="year"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Ano"
                placeholder="Ex: 2018"
                value={value?.toString()}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Cor"
                placeholder="Ex: Branco"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Button
            title="Salvar Alterações"
            onPress={handleSubmit(handleSave)}
            isLoading={isLoading}
            mt={4}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
