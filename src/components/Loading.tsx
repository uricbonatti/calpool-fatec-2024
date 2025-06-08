import { Spinner, Text, VStack } from 'native-base';

type Props = {
  message?: string;
};

export function Loading({ message = 'Carregando...' }: Props) {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center" space={2}>
      <Spinner color="green.500" size="lg" />
      <Text color="gray.300">{message}</Text>
    </VStack>
  );
}
