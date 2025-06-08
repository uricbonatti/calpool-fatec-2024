import { HStack, Text, VStack, useTheme } from 'native-base';
import { TouchableOpacity } from 'react-native';

type Props = {
  data: {
    licensePlate: string;
    rideType: 'ida' | 'volta';
    status: 'pending' | 'completed' | 'canceled';
    departureTime: string;
  };
  onPress: () => void;
};

export function HistoryCard({ data, onPress }: Props) {
  const { colors } = useTheme();

  const statusColor = {
    pending: colors.gray[300],
    completed: colors.green[500],
    canceled: colors.red[500]
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        bg="gray.600"
        alignItems="center"
        p={4}
        rounded="md"
        mb={3}
        space={4}
      >
        <VStack flex={1}>
          <HStack alignItems="center" space={2}>
            <Text 
              color={statusColor[data.status]} 
              fontSize="sm" 
              fontFamily="heading"
            >
              {data.status === 'pending' 
                ? 'Pendente' 
                : data.status === 'completed' 
                  ? 'Realizada' 
                  : 'Cancelada'}
            </Text>
            <Text color="gray.300" fontSize="xs">
              {data.rideType === 'ida' ? 'Ida' : 'Volta'}
            </Text>
          </HStack>

          <Text color="gray.100" fontSize="md" fontFamily="heading" mt={1}>
            Placa: {data.licensePlate}
          </Text>

          <Text color="gray.300" fontSize="sm">
            Horário: {data.departureTime}
          </Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}
