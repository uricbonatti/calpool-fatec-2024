import { ErrorScreen } from '@components/ErrorScreen';
import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { useAsyncMock } from '@hooks/useAsyncMock';
import { fetchRideHistoryMock } from '@mocks/api.mock';
import { groupRidesByDate } from '@utils/dateUtils';
import {
  Center,
  Heading,
  SectionList,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import { RefreshControl } from 'react-native';

export function History() {
  const {
    data: rides,
    isLoading,
    error,
    retry,
  } = useAsyncMock(fetchRideHistoryMock);

  const handleRefresh = () => {
    retry();
  };

  if (isLoading && !rides) {
    return (
      <VStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="lg" color="green.500" />
        <Text color="gray.300" mt={2}>
          Carregando histórico...
        </Text>
      </VStack>
    );
  }

  if (error) {
    return <ErrorScreen message={error} onRetry={retry} />;
  }

  const groupedRides = rides ? groupRidesByDate(rides) : [];

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Caronas" />

      <SectionList
        sections={groupedRides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoryCard
            data={item}
            onPress={() => console.log('Abrir detalhes', item.id)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Heading
            color="gray.200"
            fontSize="md"
            mt={6}
            mb={3}
            fontFamily="heading"
          >
            {title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={groupedRides.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <Center flex={1} px={8}>
            <Text color="gray.100" textAlign="center">
              Nenhuma carona registrada ainda.{'\n'}
              Quando você oferecer ou participar de caronas,{'\n'}
              elas aparecerão aqui.
            </Text>
          </Center>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading && !!rides}
            onRefresh={handleRefresh}
            colors={['#00B37E']}
          />
        }
      />
    </VStack>
  );
}
