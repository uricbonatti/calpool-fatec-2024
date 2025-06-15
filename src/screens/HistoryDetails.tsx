import { ScreenHeader } from '@components/ScreenHeader';
import { CarpoolDetailsDTO } from '@dtos';
import { getCarpoolById } from '@mocks/carpool.mock';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import { ArrowRight, QrCode } from 'phosphor-react-native';
import React, { useEffect } from 'react';

type RouteParams = {
  carpoolId: string;
};

export function HistoryDetails() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const { carpoolId } = route.params as RouteParams;
  const { colors } = useTheme();

  // Mock data - substituir por chamada à API

  const [carpoolDetails, setCarpoolDetails] =
    React.useState<CarpoolDetailsDTO>();

  const [showContribution, setShowContribution] = React.useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      // const carpool = await fetchCarpoolDetailsMock(carpoolId);
      const carpool = getCarpoolById(carpoolId);

      setCarpoolDetails(carpool);
      setShowContribution(
        carpool.ride.status === 'completed' && !!carpool.driver.pixKey
      );
    };
    fetchDetails();
  }, [carpoolId]);

  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader
        title="Detalhes da Carona"
        showBackButton
        onPress={() => navigation.goBack()}
      />
      {carpoolDetails && (
        <ScrollView flex={1} px={5} showsVerticalScrollIndicator={false}>
          {/* Status e Tipo - Textos ajustados */}
          <HStack
            space={2}
            alignItems="center"
            justifyContent={'center'}
            mb={4}
            mt={4}
          >
            {/* Badge de Status */}
            <Box
              bg={
                carpoolDetails.ride.status === 'completed'
                  ? 'green.700'
                  : 'red.700'
              }
              px={3}
              py={1}
              rounded="full"
              borderWidth={1}
              borderColor={
                carpoolDetails.ride.status === 'completed'
                  ? 'green.500'
                  : 'red.500'
              }
            >
              <Text
                color="gray.100"
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
              >
                {carpoolDetails.ride.status === 'completed'
                  ? 'Concluída'
                  : 'Cancelada'}
              </Text>
            </Box>

            {/* Badge de Tipo */}
            <Box
              bg="gray.600"
              px={3}
              py={1}
              rounded="full"
              borderWidth={1}
              borderColor="blue.400"
            >
              <Text
                color="blue.300"
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
              >
                {carpoolDetails.ride.rideType === 'ida' ? 'Ida' : 'Volta'}
              </Text>
            </Box>
          </HStack>

          {/* Rota - Textos ajustados */}
          <Box bg="gray.600" p={4} rounded="md" mb={6}>
            <HStack alignItems="center" space={2}>
              <Text
                flex={1}
                color="gray.100"
                fontSize="md"
                fontFamily="heading"
              >
                {carpoolDetails.ride.origin}
              </Text>
              <ArrowRight size={16} color={colors.gray[300]} />
              <Text
                flex={1}
                color="gray.100"
                fontSize="md"
                fontFamily="heading"
              >
                {carpoolDetails.ride.destination}
              </Text>
            </HStack>

            <HStack space={4} mt={3}>
              <VStack>
                <Text color="gray.300" fontSize="sm" fontWeight="medium">
                  Saída
                </Text>
                <Text color="gray.100" fontSize="md">
                  {carpoolDetails.ride.departureTime}
                </Text>
              </VStack>
              {carpoolDetails.ride.arrivalTime && (
                <VStack>
                  <Text color="gray.300" fontSize="sm" fontWeight="medium">
                    Chegada
                  </Text>
                  <Text color="gray.100" fontSize="md">
                    {carpoolDetails.ride.arrivalTime}
                  </Text>
                </VStack>
              )}
            </HStack>
          </Box>

          {/* Motorista e Veículo - Textos ajustados */}
          <HStack space={3} mb={6}>
            <Box bg="gray.600" p={4} rounded="md" flex={1}>
              <Text color="gray.300" fontSize="sm" fontWeight="medium" mb={1}>
                Motorista
              </Text>
              <HStack space={3} alignItems="center">
                <Avatar
                  source={{ uri: carpoolDetails.driver.avatar }}
                  size="sm"
                  bg="green.500"
                >
                  {carpoolDetails.driver.name.charAt(0)}
                </Avatar>
                <Text color="gray.100" fontSize="md">
                  {carpoolDetails.driver.name}
                </Text>
              </HStack>
            </Box>

            <Box bg="gray.600" p={4} rounded="md" flex={1}>
              <Text color="gray.300" fontSize="sm" fontWeight="medium" mb={1}>
                Veículo
              </Text>
              <Text color="gray.100" fontSize="md">
                {carpoolDetails.vehicle.licensePlate}
              </Text>
              {carpoolDetails.vehicle.model && (
                <Text color="gray.300" fontSize="sm">
                  {carpoolDetails.vehicle.model}
                </Text>
              )}
            </Box>
          </HStack>

          {/* Participantes - Textos ajustados */}
          {carpoolDetails.participants.length > 0 && (
            <Box bg="gray.600" p={4} rounded="md" mb={6}>
              <Text color="gray.300" fontSize="sm" fontWeight="medium" mb={2}>
                Participantes ({carpoolDetails.participants.length})
              </Text>
              <VStack space={3}>
                {carpoolDetails.participants.map((participant) => (
                  <HStack key={participant.id} space={3} alignItems="center">
                    <Avatar
                      source={{ uri: participant.avatar }}
                      size="sm"
                      bg="blue.500"
                    >
                      {participant.name.charAt(0)}
                    </Avatar>
                    <Text color="gray.100" fontSize="md">
                      {participant.name}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          )}

          {/* Contribuição - Textos ajustados */}
          {showContribution && (
            <Box bg="gray.600" p={4} rounded="md" mb={6}>
              <HStack justifyContent="space-between" alignItems="center" mb={3}>
                <Text color="gray.300" fontSize="sm" fontWeight="medium">
                  Contribuição
                </Text>
                <Text color="green.500" fontSize="md" fontFamily="heading">
                  R$ 3,00
                </Text>
              </HStack>

              <Divider bg="gray.500" my={3} />

              <Text color="gray.300" fontSize="sm" fontWeight="medium" mb={2}>
                QR Code
              </Text>
              <HStack
                space={3}
                alignItems="center"
                bg="gray.700"
                p={3}
                rounded="md"
              >
                <QrCode size={24} color={colors.green[500]} />
                <Text color="gray.100" fontSize="md" flex={1} numberOfLines={1}>
                  Y2hhdmVfcGl4X2RvX3VzdWFyaW8=
                </Text>
              </HStack>

              <Button
                mt={4}
                variant="outline"
                borderColor="green.500"
                _text={{
                  color: 'green.500',
                  fontSize: 'md',
                  fontWeight: 'medium',
                }}
                leftIcon={<QrCode size={20} color={colors.green[500]} />}
              >
                Copiar QR Code
              </Button>
            </Box>
          )}
        </ScrollView>
      )}
    </VStack>
  );
}
