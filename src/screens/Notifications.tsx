import { Loading } from '@components/Loading';
import { ScreenHeader } from '@components/ScreenHeader';
import { fetchNotificationsMock } from '@mocks/api.mock';
import { Badge, Center, HStack, ScrollView, Text, VStack } from 'native-base';
import { useCallback, useState } from 'react';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'ride' | 'system' | 'alert';
  read: boolean;
  createdAt: Date;
};

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchNotificationsMock();
      setNotifications(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  if (isLoading) return <Loading />;

  return (
    <VStack flex={1}>
      <ScreenHeader title="Notificações" />
      
      <ScrollView px={5}>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <HStack 
              key={notification.id} 
              bg={notification.read ? 'gray.700' : 'gray.600'}
              p={4} 
              rounded="md" 
              mb={3}
              space={3}
            >
              <VStack flex={1}>
                <HStack space={2} alignItems="center">
                  <Text fontFamily="heading" flex={1}>
                    {notification.title}
                  </Text>
                  {!notification.read && (
                    <Badge colorScheme="green" variant="solid" rounded="full" />
                  )}
                </HStack>
                <Text color="gray.300">{notification.message}</Text>
                <Text color="gray.500" fontSize="xs" mt={1}>
                  {notification.createdAt.toLocaleDateString()}
                </Text>
              </VStack>
            </HStack>
          ))
        ) : (
          <Center flex={1} mt={10}>
            <Text color="gray.400">Nenhuma notificação</Text>
          </Center>
        )}
      </ScrollView>
    </VStack>
  );
}
