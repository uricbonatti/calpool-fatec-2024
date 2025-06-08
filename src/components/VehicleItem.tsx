import { HStack, IconButton, Text, VStack } from 'native-base';
import { Trash } from 'phosphor-react-native';

type Vehicle = {
  id: string;
  model: string;
  plate: string;
};

type Props = {
  vehicle: Vehicle;
  onRemove: () => void;
};

export function VehicleItem({ vehicle, onRemove }: Props) {
  return (
    <HStack
      bg="gray.600"
      p={4}
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
      mb={2}
    >
      <VStack>
        <Text color="white" fontFamily="heading">
          {vehicle.model}
        </Text>
        <Text color="gray.300" fontSize="sm">
          {vehicle.plate}
        </Text>
      </VStack>

      <IconButton
        icon={<Trash size={20} color="#F75A68" />}
        onPress={onRemove}
      />
    </HStack>
  );
}
