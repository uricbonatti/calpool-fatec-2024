import { Button } from '@components/Button';
import { ErrorScreen } from '@components/ErrorScreen';
import { Loading } from '@components/Loading';
import { useAsyncMock } from '@hooks/useAsyncMock';
import { signInMock } from '@mocks/api.mock';
import { Center, Heading, ScrollView, Text, VStack } from 'native-base';

export function SignIn() {
  const { execute: handleSignIn, isLoading, error } = useAsyncMock(signInMock);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16} backgroundColor="gray.800">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorScreen message={error} onRetry={handleSignIn} />
        ) : (
          <>
            <VStack flex={1} justifyContent="center">
              <Center paddingBottom={6}>
                <VStack marginBottom={8} space={1}>
                  <Heading
                    color="green.500"
                    fontSize="3xl"
                    fontFamily="heading"
                  >
                    Fatec Caronas
                  </Heading>
                  <Text color="gray.100" fontSize="md" textAlign="center">
                    Carona para Alunos
                  </Text>
                </VStack>
                <Button
                  title="Login Institucional"
                  onPress={handleSignIn}
                  isLoading={isLoading}
                />
              </Center>
            </VStack>
          </>
        )}
      </VStack>
    </ScrollView>
  );
}
