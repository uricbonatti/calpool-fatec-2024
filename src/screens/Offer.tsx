import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { SelectInput } from '@components/SelectInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, Platform, TouchableOpacity } from 'react-native';

// Tipos
type FormData = {
  rideType: 'ida' | 'volta' | 'ida-volta';
  recurrence: 'once' | 'daily' | 'weekly';
  vehicleId: string;
  date: string;
  arrivalTime?: string;
  departureTime?: string;
  notes?: string;
};

type OptionType = {
  label: string;
  value: string;
};

// Constantes de estilo
const styles = {
  sectionSpacing: 4,
  inputSpacing: 3,
  mapHeight: 120,
  buttonMargin: 6,
  screenPadding: 6,
};

// Opções para selects
const rideTypeOptions: OptionType[] = [
  { label: 'Somente Ida', value: 'ida' },
  { label: 'Somente Volta', value: 'volta' },
  { label: 'Ida e Volta', value: 'ida-volta' },
];

const recurrenceOptions: OptionType[] = [
  { label: 'Uma vez', value: 'once' },
  { label: 'Todo dia', value: 'daily' },
  { label: 'Dias específicos', value: 'weekly' },
];

// Mock data
const mockVehicles = [
  { id: '1', model: 'Fiat Uno', plate: 'ABC1D23' },
  { id: '2', model: 'VW Gol', plate: 'XYZ9E87' },
];

// Componente de preview do mapa
const RideMapPreview = () => (
  <Box
    bg="gray.600"
    h={styles.mapHeight}
    mb={styles.sectionSpacing}
    rounded="md"
    justifyContent="center"
    alignItems="center"
    borderWidth={1}
    borderColor="gray.500"
  >
    <Text color="gray.300" fontSize="sm">
      Mapa com rota do seu perfil para Fatec
    </Text>
  </Box>
);

// Componente de item do resumo
const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <HStack justifyContent="space-between" py={1}>
    <Text color="gray.300" fontSize="md">
      {label}
    </Text>
    <Text fontFamily="heading" color="gray.100">
      {value}
    </Text>
  </HStack>
);

// Tela de confirmação
const ConfirmationScreen = ({
  onCancel,
  onSubmit,
  isSubmitting,
  watch,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  watch: any;
}) => (
  <VStack flex={1}>
    <ScreenHeader title="Confirmar Carona" showBackButton onPress={onCancel} />

    <VStack px={styles.screenPadding} space={4} flex={1}>
      <Heading fontSize="lg" mb={2} color="gray.100">
        Resumo da Carona
      </Heading>

      <VStack space={2} bg="gray.600" p={3} rounded="md">
        <SummaryItem label="Data" value={watch('date') || 'Não definida'} />
        <SummaryItem
          label="Tipo"
          value={
            watch('rideType') === 'ida'
              ? 'Ida'
              : watch('rideType') === 'volta'
                ? 'Volta'
                : 'Ida e Volta'
          }
        />
        <SummaryItem
          label="Recorrência"
          value={
            watch('recurrence') === 'once'
              ? 'Única'
              : watch('recurrence') === 'daily'
                ? 'Diária'
                : 'Semanal'
          }
        />
        <SummaryItem
          label="Veículo"
          value={
            mockVehicles.find((v) => v.id === watch('vehicleId'))?.model ||
            'Não selecionado'
          }
        />
      </VStack>

      <Divider bg="gray.500" my={3} />

      <Box flex={1} justifyContent="center" bg="gray.600" rounded="md">
        <Center p={4}>
          <Text color="gray.400" fontSize="sm">
            Mapa da rota apareceria aqui
          </Text>
        </Center>
      </Box>

      <Button
        title="Confirmar Publicação"
        onPress={onSubmit}
        isLoading={isSubmitting}
        mt={4}
      />
    </VStack>
  </VStack>
);

// Componente principal
export function Offer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPicker, setShowPicker] = useState({
    date: false,
    arrival: false,
    departure: false,
  });
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: new Date(),
    arrival: new Date(),
    departure: new Date(),
  });

  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      rideType: 'ida',
      recurrence: 'once',
      date: new Date().toLocaleDateString('pt-BR'),
    },
  });

  const rideType = watch('rideType');
  const recurrence = watch('recurrence');

  const handleDateTimeChange = (
    type: 'date' | 'arrival' | 'departure',
    event: any,
    date?: Date
  ) => {
    setShowPicker((prev) => ({ ...prev, [type]: false }));
    if (date) {
      setSelectedDateTime((prev) => ({ ...prev, [type]: date }));

      if (type === 'date') {
        const dateString = date.toLocaleDateString('pt-BR');
        setValue('date', dateString);
      } else {
        const timeString = date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        if (type === 'arrival') {
          setValue('arrivalTime', timeString);
        } else {
          setValue('departureTime', timeString);
        }
      }
    }
  };

  const handlePickerPress = (type: 'date' | 'arrival' | 'departure') => {
    Keyboard.dismiss();
    setShowPicker((prev) => ({ ...prev, [type]: true }));
  };

  const handlePublish = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.show({
        title: 'Carona publicada com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigation.goBack();
    } catch (error) {
      toast.show({
        title: 'Erro ao publicar carona',
        description: 'Tente novamente mais tarde',
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
      <ConfirmationScreen
        onCancel={() => setShowConfirmation(false)}
        onSubmit={handleSubmit(handlePublish)}
        isSubmitting={isSubmitting}
        watch={watch}
      />
    );
  }

  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader title="Oferecer Carona" />

      <ScrollView
        px={styles.screenPadding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <VStack space={styles.inputSpacing}>
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
                {rideTypeOptions.map((option) => (
                  <SelectInput.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
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
                {recurrenceOptions.map((option) => (
                  <SelectInput.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </SelectInput>
            )}
          />

          {/* Data (mostrar apenas se não for diário) */}
          {recurrence !== 'daily' && (
            <Controller
              control={control}
              name="date"
              render={({ field: { value } }) => (
                <>
                  <TouchableOpacity
                    onPress={() => handlePickerPress('date')}
                    activeOpacity={0.7}
                  >
                    <Input
                      label="Data"
                      placeholder="Selecione a data"
                      value={value}
                      editable={false}
                      pointerEvents="none"
                    />
                  </TouchableOpacity>
                  {showPicker.date && (
                    <DateTimePicker
                      value={selectedDateTime.date}
                      mode="date"
                      display={
                        Platform.OS === 'android' ? 'default' : 'spinner'
                      }
                      minimumDate={new Date()}
                      onChange={(event, date) =>
                        handleDateTimeChange('date', event, date)
                      }
                    />
                  )}
                </>
              )}
            />
          )}

          {/* Veículo */}
          <Controller
            control={control}
            name="vehicleId"
            render={({ field: { onChange } }) => (
              <SelectInput
                label="Veículo"
                onValueChange={onChange}
                placeholder="Selecione um veículo"
              >
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
              render={({ field: { value } }) => (
                <>
                  <TouchableOpacity
                    onPress={() => handlePickerPress('arrival')}
                    activeOpacity={0.7}
                  >
                    <Input
                      label="Horário de Chegada (Fatec)"
                      placeholder="HH:MM"
                      value={value}
                      editable={false}
                      pointerEvents="none"
                    />
                  </TouchableOpacity>
                  {showPicker.arrival && (
                    <DateTimePicker
                      value={selectedDateTime.arrival}
                      mode="time"
                      display={
                        Platform.OS === 'android' ? 'default' : 'spinner'
                      }
                      onChange={(event, date) =>
                        handleDateTimeChange('arrival', event, date)
                      }
                    />
                  )}
                </>
              )}
            />
          )}

          {(rideType === 'volta' || rideType === 'ida-volta') && (
            <Controller
              control={control}
              name="departureTime"
              render={({ field: { value } }) => (
                <>
                  <TouchableOpacity
                    onPress={() => handlePickerPress('departure')}
                    activeOpacity={0.7}
                  >
                    <Input
                      label="Horário de Saída (Fatec)"
                      placeholder="HH:MM"
                      value={value}
                      editable={false}
                      pointerEvents="none"
                    />
                  </TouchableOpacity>
                  {showPicker.departure && (
                    <DateTimePicker
                      value={selectedDateTime.departure}
                      mode="time"
                      display={
                        Platform.OS === 'android' ? 'default' : 'spinner'
                      }
                      onChange={(event, date) =>
                        handleDateTimeChange('departure', event, date)
                      }
                    />
                  )}
                </>
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
                textAlignVertical="top"
              />
            )}
          />

          <Button
            title="Visualizar Resumo"
            onPress={handlePreview}
            mt={styles.buttonMargin}
            mb={6}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
