import { Button, Text, VStack } from 'native-base';

type Props = {
  message: string;
  onRetry?: () => void;
};
export function ErrorScreen({ message, onRetry }: Props) {
  return (
    <VStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      p={4}
      space={4}
    >
      <Text color="red.500" textAlign="center">
        {message}
      </Text>
      {onRetry && (
        <Button onPress={onRetry} variant="outline">
          Tentar novamente
        </Button>
      )}
    </VStack>
  );
}
