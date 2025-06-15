/* eslint-disable indent */
// src/screens/Notifications.tsx
import { ScreenHeader } from '@components/ScreenHeader';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {
  Badge,
  Box,
  Center,
  HStack,
  IconButton,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import { Bell, BellSlash, Check, X } from 'phosphor-react-native';
import { useEffect, useState } from 'react';

// Tipos de notificação mais completos para demonstração
type NotificationType =
  | 'ride_request'
  | 'ride_accepted'
  | 'ride_rejected'
  | 'ride_started'
  | 'ride_canceled'
  | 'payment_received'
  | 'system_alert';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  rideId?: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  read: boolean;
  createdAt: Date;
  actionRequired?: boolean;
}

// Mock data completo para demonstração
const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'ride_request',
    title: 'Nova solicitação de carona',
    message: 'Ana Silva quer entrar na sua carona de hoje às 08:00',
    rideId: 'ride123',
    userId: 'user456',
    userName: 'Ana Silva',
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    read: false,
    actionRequired: true,
    createdAt: new Date(Date.now() - 300000), // 5 minutos atrás
  },
  {
    id: '2',
    type: 'ride_accepted',
    title: 'Carona aceita!',
    message: 'Sua solicitação para a carona de Carlos foi aceita',
    rideId: 'ride789',
    userId: 'user123',
    userName: 'Carlos Oliveira',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    read: true,
    createdAt: new Date(Date.now() - 3600000), // 1 hora atrás
  },
  {
    id: '3',
    type: 'ride_started',
    title: 'Carona em andamento',
    message: 'Sua carona para Fatec está a caminho. Chega em ~15 min.',
    rideId: 'ride101',
    read: false,
    createdAt: new Date(Date.now() - 86400000), // 1 dia atrás
  },
  {
    id: '4',
    type: 'payment_received',
    title: 'Pagamento recebido',
    message: 'Você recebeu R$ 5,00 pela carona compartilhada',
    rideId: 'ride101',
    read: true,
    createdAt: new Date(Date.now() - 172800000), // 2 dias atrás
  },
  {
    id: '5',
    type: 'system_alert',
    title: 'Atualização do app',
    message: 'Nova versão disponível. Atualize para melhor experiência',
    read: false,
    createdAt: new Date(Date.now() - 259200000), // 3 dias atrás
  },
];

export function Notifications() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  // Carrega notificações mockadas
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setNotifications(DEMO_NOTIFICATIONS);
      setIsLoading(false);
      setHasUnread(DEMO_NOTIFICATIONS.some((n) => !n.read));
    }, 800); // Simula carregamento
  }, []);

  const handleAcceptRequest = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n: any) =>
        n.id === notificationId
          ? {
              ...n,
              title: 'Solicitação aceita',
              type: 'ride_accepted',
              read: true,
              message: `Você aceitou ${n.userName} na sua carona`,
            }
          : n
      )
    );
    setHasUnread(notifications.some((n) => !n.read && n.id !== notificationId));
  };

  const handleRejectRequest = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId
          ? {
              ...n,
              type: 'ride_rejected',
              read: true,
              title: 'Solicitação recusada',
              message: `Você recusou ${n.userName} na sua carona`,
            }
          : n
      )
    );
    setHasUnread(notifications.some((n) => !n.read && n.id !== notificationId));
  };

  const handleNotificationPress = (notification: Notification) => {
    // Marca como lida
    if (!notification.read) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
      );
      setHasUnread(
        notifications.some((n) => !n.read && n.id !== notification.id)
      );
    }

    // Navega para detalhes se tiver rideId
    if (notification.rideId) {
      navigation.navigate('details', {
        carpoolId: notification.rideId,
        fromScreen: 'upcoming',
      });
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    if (type == 'ride_accepted')
      return <Check size={20} color={colors.green[500]} />;
    if (type == 'ride_rejected') return <X size={20} color={colors.red[500]} />;

    return <Bell size={20} color={colors.gray[500]} />;
  };

  return (
    <VStack flex={1} bg="gray.700">
      <ScreenHeader
        title="Notificações"
        rightIcon={hasUnread ? <Bell size={24} /> : <BellSlash size={24} />}
        rightIconColor={hasUnread ? colors.green[500] : colors.gray[400]}
      />

      {isLoading ? (
        <VStack flex={1} justifyContent="center" alignItems="center" space={2}>
          <Text color="gray.300">Carregando notificações...</Text>
          <Text color="gray.500" fontSize="xs">
            Versão demonstração
          </Text>
        </VStack>
      ) : (
        <ScrollView px={5} showsVerticalScrollIndicator={false}>
          {notifications.length === 0 ? (
            <Center flex={1} mt={10}>
              <Text color="gray.400">Nenhuma notificação</Text>
            </Center>
          ) : (
            <VStack space={3} pb={5}>
              {notifications.map((notification) => (
                <Pressable
                  key={notification.id}
                  onPress={() => handleNotificationPress(notification)}
                >
                  <Box
                    bg={notification.read ? 'gray.600' : 'gray.500'}
                    p={4}
                    rounded="md"
                    borderLeftWidth={4}
                    borderLeftColor={
                      notification.type === 'ride_accepted'
                        ? 'green.500'
                        : notification.type === 'ride_rejected'
                          ? 'red.500'
                          : notification.type === 'ride_started'
                            ? 'blue.500'
                            : notification.type === 'payment_received'
                              ? 'purple.500'
                              : 'orange.500'
                    }
                  >
                    <HStack space={2} alignItems="center" mb={2}>
                      {getNotificationIcon(notification.type)}
                      <Text
                        fontFamily="heading"
                        color="gray.100"
                        fontSize="md"
                        flex={1}
                      >
                        {notification.title}
                      </Text>
                      {!notification.read && (
                        <Badge
                          colorScheme="green"
                          rounded="full"
                          alignSelf="flex-start"
                        />
                      )}
                    </HStack>

                    <Text color="gray.300" mb={3}>
                      {notification.message}
                    </Text>

                    <HStack justifyContent="space-between" alignItems="center">
                      <Text color="gray.400" fontSize="xs">
                        {notification.createdAt.toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>

                      {notification.actionRequired && (
                        <HStack space={2}>
                          <IconButton
                            icon={<Check size={20} color={colors.green[500]} />}
                            onPress={() => handleAcceptRequest(notification.id)}
                            variant="ghost"
                            _pressed={{ bg: 'green.700' }}
                          />
                          <IconButton
                            icon={<X size={20} color={colors.red[500]} />}
                            onPress={() => handleRejectRequest(notification.id)}
                            variant="ghost"
                            _pressed={{ bg: 'red.700' }}
                          />
                        </HStack>
                      )}
                    </HStack>

                    {notification.userId && (
                      <HStack mt={2} space={2} alignItems="center">
                        <Box
                          w={6}
                          h={6}
                          rounded="full"
                          bg="gray.400"
                          alignItems="center"
                          justifyContent="center"
                          overflow="hidden"
                        >
                          {notification.userAvatar ? (
                            <Image
                              source={{ uri: notification.userAvatar }}
                              alt={`Foto de ${notification.userName}`}
                              w="full"
                              h="full"
                            />
                          ) : (
                            <Text color="white" fontSize="xs">
                              {notification.userName?.charAt(0)}
                            </Text>
                          )}
                        </Box>
                        <Text color="gray.300" fontSize="sm">
                          {notification.userName}
                        </Text>
                      </HStack>
                    )}
                  </Box>
                </Pressable>
              ))}
            </VStack>
          )}
        </ScrollView>
      )}
    </VStack>
  );
}
