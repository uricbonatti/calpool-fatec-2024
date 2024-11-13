import { Center, Heading, ScrollView, Text, VStack, View } from 'native-base';
import { useState } from 'react';

import { Button } from '@components/Button';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {}

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16} backgroundColor="gray.800">
        <View flex={1} />
        <Center paddingBottom={6}>
          <View marginBottom={8}>
            <Heading
              color="green.500"
              fontSize="3xl"
              mb={8}
              fontFamily="heading"
              marginBottom={-1}
            >
              Fatec Caronas
            </Heading>
            <Text color="gray.100" fontSize="md" textAlign="center">
              Carona para Alunos
            </Text>
          </View>
          <Button title="Login Institucional" onPress={handleSignIn} />
        </Center>
      </VStack>
    </ScrollView>
  );
}
