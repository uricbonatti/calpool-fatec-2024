// src/screens/Search.tsx
import { ErrorScreen } from '@components/ErrorScreen';
import { Loading } from '@components/Loading';
import { RideCard } from '@components/RideCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { useAsyncMock } from '@hooks/useAsyncMock';
import { fetchAvailableRidesMock } from '@mocks/api.mock';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {
  Box,
  CheckIcon,
  HStack,
  Input,
  ScrollView,
  Select,
  Text,
  VStack,
} from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';

type RideType = 'ida' | 'volta' | 'todos';
type DayFilter = 'hoje' | 'amanha' | 'personalizado';

export function Search() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [rideType, setRideType] = useState<RideType>('ida');
  const [dayFilter, setDayFilter] = useState<DayFilter>('hoje');
  const [customDate, setCustomDate] = useState('');

  const {
    data: rides = [],
    isLoading,
    error,
    execute: reloadRides,
  } = useAsyncMock(fetchAvailableRidesMock);

  // Carrega os dados quando a tela é focada
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      reloadRides();
    });

    return unsubscribe;
  }, [navigation, reloadRides]);

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
    return <ErrorScreen message={error} onRetry={reloadRides} />;
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
            _selectedItem={{
              bg: 'green.500',
              endIcon: <CheckIcon size={4} />,
            }}
          >
            <Select.Item label="Somente Ida" value="ida" />
            <Select.Item label="Somente Volta" value="volta" />
            <Select.Item label="Todas" value="todos" />
          </Select>

          <Select
            flex={1}
            selectedValue={dayFilter}
            onValueChange={(value) => setDayFilter(value as DayFilter)}
            minHeight={10}
            _selectedItem={{
              bg: 'green.500',
              endIcon: <CheckIcon size={4} />,
            }}
          >
            <Select.Item label="Hoje" value="hoje" />
            <Select.Item label="Amanhã" value="amanha" />
            <Select.Item label="Escolher Data" value="personalizado" />
          </Select>
        </HStack>

        {dayFilter === 'personalizado' && (
          <Input
            placeholder="DD/MM/AAAA"
            value={customDate}
            onChangeText={setCustomDate}
            keyboardType="numeric"
            maxLength={10}
            _focus={{ borderColor: 'green.500' }}
          />
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
                    color="gray.300"
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
          <Box flex={1} justifyContent="center" mt={10}>
            <Text textAlign="center" color="gray.400" fontSize="lg">
              {isLoading ? 'Carregando...' : 'Nenhuma carona encontrada'}
            </Text>
            {!isLoading && (
              <Text textAlign="center" color="gray.500" mt={2}>
                {rideType !== 'todos' &&
                  `Filtro ativo: ${rideType === 'ida' ? 'Ida' : 'Volta'}`}
                {dayFilter !== 'hoje' &&
                  ` • ${dayFilter === 'amanha' ? 'Amanhã' : customDate || 'Data específica'}`}
              </Text>
            )}
          </Box>
        )}
      </ScrollView>
    </VStack>
  );
}
