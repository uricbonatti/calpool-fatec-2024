import { Button } from '@components/Button';
import { ScreenHeader } from '@components/ScreenHeader';
import { CarpoolDetailsDTO } from '@dtos';
import { getCarpoolById } from '@mocks/carpool.mock';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {
  Avatar,
  Badge,
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import React, { useEffect } from 'react';
import MapView, { Polyline } from 'react-native-maps';

type RouteParams = {
  carpoolId: string;
  fromScreen?: 'search' | 'upcoming' | 'history';
};

const SensitiveData = ({
  children,
  hide,
}: {
  children: React.ReactNode;
  hide?: boolean;
}) => {
  if (hide) {
    return (
      <Text color="gray.400" fontStyle="italic">
        Informação indisponível
      </Text>
    );
  }
  return <>{children}</>;
};

const RideActionButton = ({
  details,
  fromScreen,
}: {
  details: CarpoolDetailsDTO;
  fromScreen?: RouteParams['fromScreen'];
}) => {
  const handleRequestSeat = () => console.log('Solicitar vaga');
  const handleCancelRide = () => console.log('Cancelar carona');
  const handleLeaveRide = () => console.log('Desistir da vaga');

  if (fromScreen === 'history') return null;

  if (fromScreen === 'search') {
    return (
      <Button
        title="Solicitar Vaga"
        onPress={handleRequestSeat}
        isDisabled={
          details.vehicle.availableSeats <= 0 ||
          details.ride.status !== 'pending'
        }
      />
    );
  }

  if (fromScreen === 'upcoming') {
    if (details.user.isDriver) {
      return (
        <Button
          title="Cancelar Carona"
          variant="outline"
          onPress={handleCancelRide}
          isDisabled={details.ride.status !== 'pending'}
        />
      );
    }
    return (
      <Button
        title="Desistir da Vaga"
        variant="outline"
        onPress={handleLeaveRide}
        isDisabled={details.ride.status !== 'pending'}
      />
    );
  }

  return null;
};

export function Details() {
  const route = useRoute();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { carpoolId, fromScreen } = route.params as RouteParams;
  const { colors } = useTheme();

  // Mock data - Substituir por chamada à API
  const [carpoolDetails, setCarpoolDetails] =
    React.useState<CarpoolDetailsDTO>();
  const [shouldMaskData, setShouldMaskData] = React.useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      // const carpool = await fetchCarpoolDetailsMock(carpoolId);
      const carpool = getCarpoolById(carpoolId);
      if (!carpool) {
        console.error('Carona não encontrada para o ID:', carpoolId);
        return;
      }
      setCarpoolDetails(carpool);
      setShouldMaskData(
        carpool.ride.status === 'canceled' ||
          (fromScreen === 'search' && carpool.ride.status !== 'completed')
      );
    };
    fetchDetails();
  }, [carpoolId]);

  const statusColor = {
    pending: colors.gray[300],
    completed: colors.green[500],
    canceled: colors.red[500],
    in_progress: colors.blue[500],
  };

  return (
    <VStack flex={1}>
      <ScreenHeader
        title={fromScreen === 'history' ? 'Detalhes da Carona' : 'Detalhes'}
        showBackButton
        onPress={() => navigation.goBack()}
      />
      {carpoolDetails && (
        <>
          <ScrollView flex={1} px={6} showsVerticalScrollIndicator={false}>
            {/* Mapa */}
            <Box h={200} bg="gray.600" rounded="md" mb={4} overflow="hidden">
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: carpoolDetails.ride.routeCoordinates[0].latitude,
                  longitude: carpoolDetails.ride.routeCoordinates[0].longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Polyline
                  coordinates={carpoolDetails.ride.routeCoordinates}
                  strokeColor={colors.green[500]}
                  strokeWidth={4}
                />
              </MapView>
            </Box>

            {/* Informações Básicas */}
            <VStack space={1} mb={6}>
              <HStack space={2} alignItems="center">
                <Badge
                  colorScheme={
                    carpoolDetails.ride.status === 'completed'
                      ? 'success'
                      : carpoolDetails.ride.status === 'canceled'
                        ? 'error'
                        : 'info'
                  }
                >
                  {carpoolDetails.ride.status === 'pending'
                    ? 'Pendente'
                    : carpoolDetails.ride.status === 'completed'
                      ? 'Concluída'
                      : 'Cancelada'}
                </Badge>
                <Text color="gray.300">
                  {carpoolDetails.ride.rideType === 'ida' ? 'Ida' : 'Volta'}
                </Text>
              </HStack>

              <Text fontSize="lg" fontFamily="heading" color="gray.100">
                {carpoolDetails.ride.origin} → {carpoolDetails.ride.destination}
              </Text>

              <Text color="gray.300">
                Saída: {carpoolDetails.ride.departureTime}
                {carpoolDetails.ride.arrivalTime &&
                  ` • Chegada: ${carpoolDetails.ride.arrivalTime}`}
              </Text>
            </VStack>

            {/* Motorista */}
            <VStack space={2} mb={6}>
              <Text fontFamily="heading" color="gray.200">
                Motorista
              </Text>
              <SensitiveData hide={shouldMaskData}>
                <HStack space={3} alignItems="center">
                  <Avatar
                    source={{ uri: carpoolDetails.driver.avatar }}
                    size="sm"
                  >
                    {carpoolDetails.driver.name.charAt(0)}
                  </Avatar>
                  <Text color="gray.100">{carpoolDetails.driver.name}</Text>
                </HStack>
              </SensitiveData>
            </VStack>

            {/* Veículo */}
            <VStack space={2} mb={6}>
              <Text fontFamily="heading" color="gray.200">
                Veículo
              </Text>
              <SensitiveData hide={shouldMaskData}>
                <Text color="gray.100">
                  {carpoolDetails.vehicle.licensePlate}
                </Text>
              </SensitiveData>
              <Text color="gray.300">
                Vagas disponíveis: {carpoolDetails.vehicle.availableSeats}
              </Text>
            </VStack>

            {/* Participantes */}
            <SensitiveData hide={shouldMaskData}>
              {carpoolDetails.participants.length > 0 && (
                <VStack space={2} mb={6}>
                  <Text fontFamily="heading" color="gray.200">
                    Participantes ({carpoolDetails.participants.length})
                  </Text>
                  {carpoolDetails.participants.map((participant) => (
                    <HStack
                      key={participant.id}
                      space={3}
                      alignItems="center"
                      mb={2}
                    >
                      <Avatar source={{ uri: participant.avatar }} size="sm">
                        {participant.name.charAt(0)}
                      </Avatar>
                      <Text color="gray.100">{participant.name}</Text>
                    </HStack>
                  ))}
                </VStack>
              )}
            </SensitiveData>
          </ScrollView>

          {/* Botão de Ação */}
          <Center px={6} pb={4}>
            <RideActionButton
              details={carpoolDetails}
              fromScreen={fromScreen}
            />
          </Center>
        </>
      )}
    </VStack>
  );
}
