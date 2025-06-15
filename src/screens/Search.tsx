import { ErrorScreen } from '@components/ErrorScreen';
import { Loading } from '@components/Loading';
import { RideCard } from '@components/RideCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { avaliableRidesMock } from '@mocks/carpool.mock';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {
  Box,
  Center,
  CheckIcon,
  HStack,
  Input,
  ScrollView,
  Select,
  Text,
  VStack,
} from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';

type RideType = 'ida' | 'volta' | 'todos';
type DayFilter = 'hoje' | 'amanha' | 'personalizado';

export function Search() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [rideType, setRideType] = useState<RideType>('ida');
  const [dayFilter, setDayFilter] = useState<DayFilter>('hoje');
  const [customDate, setCustomDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const rides = avaliableRidesMock; // Mock data, replace with API call if needed
  const isLoading = false; // Replace with actual loading state
  const error = undefined; // Replace with actual error state if needed

  // Função para abrir o date picker
  const handleDatePress = () => {
    setShowDatePicker(true);
  };

  // Função para lidar com a seleção de data
  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setCustomDate(date.toLocaleDateString('pt-BR'));
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      return Promise.resolve(avaliableRidesMock);
    });

    return unsubscribe;
  }, [navigation]);

  const filteredRides = useMemo(() => {
    if (!rides || rides.length === 0) return [];

    return rides.filter((ride) => {
      const matchesType = rideType === 'todos' || ride.type === rideType;

      if (dayFilter === 'hoje') {
        const today = new Date().toLocaleDateString('pt-BR');
        return matchesType && ride.date === today;
      }

      if (dayFilter === 'amanha') {
        const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString(
          'pt-BR'
        );
        return matchesType && ride.date === tomorrow;
      }

      if (dayFilter === 'personalizado') {
        return matchesType && ride.date === customDate;
      }

      return matchesType;
    });
  }, [rides, rideType, dayFilter, customDate]);

  const handleRidePress = (carpoolId: string) => {
    navigation.navigate('details', { carpoolId });
  };

  if (isLoading && rides?.length === 0) {
    return (
      <VStack flex={1} bg="gray.700">
        <ScreenHeader title="Buscar Caronas" />
        <Loading />
      </VStack>
    );
  }

  if (error) {
    return (
      <ErrorScreen
        message={error}
        onRetry={() => Promise.resolve(avaliableRidesMock)}
      />
    );
  }

  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader title="Buscar Caronas" />

      {/* Filtros */}
      <Box bg="gray.600" px={5} py={3}>
        <HStack space={2} mb={2}>
          <Select
            flex={1}
            selectedValue={rideType}
            onValueChange={(value) => setRideType(value as RideType)}
            minHeight={10}
            placeholder="Tipo"
            placeholderTextColor="gray.400"
            color="gray.100"
            bg="gray.700"
            borderColor="gray.500"
            _selectedItem={{
              bg: 'green.700',
              endIcon: <CheckIcon size={4} color="white" />,
              _text: { color: 'white' },
            }}
            _item={{
              bg: 'gray.600',
              _text: { color: 'gray.100' },
              _pressed: { bg: 'gray.500' },
            }}
          >
            <Select.Item label="Somente Ida" value="ida" />
            <Select.Item label="Somente Volta" value="volta" />
            <Select.Item label="Todas" value="todos" />
          </Select>

          <Select
            flex={1}
            selectedValue={dayFilter}
            onValueChange={(value) => {
              setDayFilter(value as DayFilter);
              if (value !== 'personalizado') {
                setShowDatePicker(false);
              }
            }}
            minHeight={10}
            placeholder="Data"
            placeholderTextColor="gray.400"
            color="gray.100"
            bg="gray.700"
            borderColor="gray.500"
            _selectedItem={{
              bg: 'green.700',
              endIcon: <CheckIcon size={4} color="white" />,
              _text: { color: 'white' },
            }}
            _item={{
              bg: 'gray.600',
              _text: { color: 'gray.100' },
              _pressed: { bg: 'gray.500' },
            }}
          >
            <Select.Item label="Hoje" value="hoje" />
            <Select.Item label="Amanhã" value="amanha" />
            <Select.Item label="Escolher Data" value="personalizado" />
          </Select>
        </HStack>

        {dayFilter === 'personalizado' && (
          <>
            <Input
              placeholder="DD/MM/AAAA"
              placeholderTextColor="gray.400"
              value={customDate}
              onFocus={handleDatePress}
              showSoftInputOnFocus={false}
              color="gray.100"
              bg="gray.700"
              borderColor="gray.500"
              _focus={{
                borderColor: 'green.500',
                bg: 'gray.700',
              }}
            />
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
                onChange={handleDateChange}
                locale="pt-BR"
                minimumDate={new Date()}
                themeVariant="dark"
              />
            )}
          </>
        )}
      </Box>

      {/* Resultados */}
      <ScrollView flex={1} px={5} contentContainerStyle={{ paddingBottom: 16 }}>
        {filteredRides.length > 0 ? (
          <VStack space={3} mt={3}>
            {filteredRides.map((ride, index) => (
              <React.Fragment key={ride.id}>
                {(index === 0 ||
                  ride.date !== filteredRides[index - 1].date) && (
                  <Text
                    fontFamily="heading"
                    color="gray.200"
                    fontSize="md"
                    mt={index > 0 ? 4 : 0}
                    mb={2}
                  >
                    {ride.date}
                  </Text>
                )}
                <RideCard
                  data={{
                    id: ride.id,
                    type: ride.type,
                    origin: ride.origin,
                    destination: ride.destination,
                    departureTime: ride.departureTime,
                    availableSeats: ride.availableSeats,
                    driverName: ride.driverName,
                    vehicleModel: ride.vehicleModel,
                  }}
                  onPress={() => handleRidePress(ride.id)}
                />
              </React.Fragment>
            ))}
          </VStack>
        ) : (
          <Center flex={1} mt={10} px={5}>
            <Text
              textAlign="center"
              color="gray.300"
              fontSize="lg"
              fontFamily="body"
              mb={2}
            >
              {isLoading
                ? 'Carregando caronas...'
                : 'Nenhuma carona encontrada'}
            </Text>
            {!isLoading && (
              <VStack space={1}>
                {rideType !== 'todos' && (
                  <Text textAlign="center" color="gray.400" fontSize="sm">
                    Tipo: {rideType === 'ida' ? 'Ida' : 'Volta'}
                  </Text>
                )}
                {dayFilter !== 'hoje' && (
                  <Text textAlign="center" color="gray.400" fontSize="sm">
                    Data:{' '}
                    {dayFilter === 'amanha'
                      ? 'Amanhã'
                      : customDate || 'Personalizada'}
                  </Text>
                )}
              </VStack>
            )}
          </Center>
        )}
      </ScrollView>
    </VStack>
  );
}
