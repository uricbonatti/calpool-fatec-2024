import { Button } from '@components/Button';
import { ErrorScreen } from '@components/ErrorScreen';
import { Loading } from '@components/Loading';
import { ScreenHeader } from '@components/ScreenHeader';
import { mockRideRequests } from '@mocks/ride.mock';
import {
  Avatar,
  Badge,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { useEffect, useState } from 'react';

type RideRequest = {
  id: string;
  passenger: {
    id: string;
    name: string;
    avatar?: string;
  };
  rideId: string;
  status: 'pending' | 'accepted' | 'rejected';
  requestedAt: Date;
};

export function RideRequests() {
  const [requests, setRequests] = useState<RideRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRequests = async () => {
    try {
      setIsLoading(true);
      const data = mockRideRequests;
      setRequests(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar solicitações'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (requestId: string) => {
    try {
      loadRequests(); // Recarrega a lista
    } catch (err) {
      setError('Erro ao aceitar solicitação');
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <ErrorScreen message={error} onRetry={loadRequests} />;

  return (
    <VStack flex={1}>
      <ScreenHeader title="Solicitações" />

      <ScrollView px={5}>
        {requests.length > 0 ? (
          requests.map((request) => (
            <HStack
              key={request.id}
              bg="gray.600"
              p={4}
              rounded="md"
              mb={3}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack space={3} alignItems="center">
                <Avatar source={{ uri: request.passenger.avatar }} size="md">
                  {request.passenger.name.charAt(0)}
                </Avatar>
                <VStack>
                  <Text fontFamily="heading">{request.passenger.name}</Text>
                  <Text color="gray.300" fontSize="xs">
                    {request.requestedAt.toLocaleDateString()}
                  </Text>
                </VStack>
              </HStack>

              {request.status === 'pending' ? (
                <Button
                  title="Aceitar"
                  size="sm"
                  onPress={() => handleAccept(request.id)}
                />
              ) : (
                <Badge
                  colorScheme={
                    request.status === 'accepted' ? 'success' : 'error'
                  }
                >
                  {request.status === 'accepted' ? 'Aceito' : 'Recusado'}
                </Badge>
              )}
            </HStack>
          ))
        ) : (
          <Center flex={1} mt={10}>
            <Text color="gray.400">Nenhuma solicitação pendente</Text>
          </Center>
        )}
      </ScrollView>
    </VStack>
  );
}
