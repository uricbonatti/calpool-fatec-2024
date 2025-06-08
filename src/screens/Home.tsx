// src/screens/Home.tsx
import { Button } from '@components/Button';
import { ErrorScreen } from '@components/ErrorScreen';
import { HomeHeader } from '@components/HomeHeader';
import { ImminentRide } from '@components/ImminentRide';
import { Loading } from '@components/Loading';
import { NextCarpoolCard } from '@components/NextCarpoolCard';
import { NextCarpoolDTO } from '@dtos';
import { useAsyncMock } from '@hooks/useAsyncMock';
import { useAuth } from '@hooks/useAuth';
import { useUserVehicles } from '@hooks/useUserVehicles';
import { fetchNextCarpoolsMock } from '@mocks';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {
  Box,
  Center,
  FlatList,
  Heading,
  HStack,
  Text,
  VStack,
} from 'native-base';
import { Car } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
export function Home() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [carpools, setCarpools] = useState<NextCarpoolDTO[]>([]);
  const [imminentCarpool, setImminentCarpool] = useState<NextCarpoolDTO | null>(
    null
  );
  const {
    data,
    isLoading,
    error,
    execute: reloadCarpools,
  } = useAsyncMock<NextCarpoolDTO[]>(fetchNextCarpoolsMock);
  const { user } = useAuth();
  const hasVehicles = useUserVehicles(user.id);
  function handleOpenCarpoolDetails(carpoolId: string) {
    navigation.navigate('details', { carpoolId, fromScreen: 'upcoming' });
  }

  useEffect(() => {
    reloadCarpools();
    setCarpools(data || []);
    setImminentCarpool(data ? data[0] : null);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorScreen message={error} onRetry={reloadCarpools} />;
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <VStack flex={1} px={8}>
        {/* Seção de Carona Iminente */}
        {carpools?.length > 0 ? (
          <>
            <ImminentRide
              data={carpools[0]}
              onPress={() =>
                handleOpenCarpoolDetails(imminentCarpool?.id || '')
              }
            />

            <HStack justifyContent="space-between" mb={5}>
              <Heading color="gray.200" fontSize="md" fontFamily="heading">
                Próximas Caronas
              </Heading>
            </HStack>

            <FlatList
              data={carpools?.slice(1)} // Pega todas exceto a primeira (que já está no ImminentRide)
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <NextCarpoolCard
                  data={item}
                  onPress={() => handleOpenCarpoolDetails(item.id)}
                />
              )}
              ListEmptyComponent={
                <Text textAlign="center" color="gray.400" mt={4}>
                  Nenhuma carona agendada
                </Text>
              }
            />
          </>
        ) : (
          <Center flex={1}>
            <Text color="gray.400">Nenhuma carona disponível no momento</Text>
            <Button
              title="Oferecer Carona"
              mt={4}
              onPress={() => navigation.navigate('offer')}
            />
          </Center>
        )}
      </VStack>
      {hasVehicles && (
        <Box position="absolute" bottom={8} left={0} right={0} px={8}>
          <Button
            title="Oferecer Carona"
            leftIcon={<Car size={24} color="white" />}
            onPress={() => navigation.navigate('offer')}
          />
        </Box>
      )}
    </VStack>
  );
}
