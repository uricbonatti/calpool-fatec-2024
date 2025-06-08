// src/components/RideCard.tsx
import { Box, HStack, Text, useTheme, VStack } from 'native-base';
import { ArrowRight, Car, Users } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

type RideCardProps = {
  data: {
    id: string;
    type: 'ida' | 'volta';
    origin: string;
    destination: string;
    departureTime: string;
    availableSeats: number;
    driverName: string;
    vehicleModel: string;
  };
  onPress: () => void;
};

export function RideCard({ data, onPress }: RideCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Box bg="gray.600" p={4} rounded="md" mb={3}>
        <HStack space={2} alignItems="center" mb={2}>
          <Box
            bg={data.type === 'ida' ? 'blue.500' : 'purple.500'}
            px={2}
            py={1}
            rounded="full"
          >
            <Text color="white" fontSize="xs" bold>
              {data.type === 'ida' ? 'IDA' : 'VOLTA'}
            </Text>
          </Box>
          <Text color="green.500" fontSize="sm">
            {data.availableSeats} vaga{data.availableSeats !== 1 ? 's' : ''}{' '}
            disponível{data.availableSeats !== 1 ? 's' : ''}
          </Text>
        </HStack>

        <VStack space={1} mb={3}>
          <HStack alignItems="center" space={2}>
            <Text color="gray.100" flex={1}>
              {data.origin}
            </Text>
            <ArrowRight size={16} color={colors.gray[300]} />
            <Text color="gray.100" flex={1}>
              {data.destination}
            </Text>
          </HStack>
        </VStack>

        <HStack justifyContent="space-between">
          <HStack alignItems="center" space={2}>
            <Car size={16} color={colors.gray[300]} />
            <Text color="gray.300" fontSize="sm">
              {data.vehicleModel}
            </Text>
          </HStack>

          <HStack alignItems="center" space={2}>
            <Users size={16} color={colors.gray[300]} />
            <Text color="gray.300" fontSize="sm">
              {data.driverName}
            </Text>
          </HStack>
        </HStack>

        <Text color="gray.400" fontSize="sm" mt={2}>
          Saída: {data.departureTime}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
