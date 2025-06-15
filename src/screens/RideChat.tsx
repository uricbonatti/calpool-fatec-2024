/* eslint-disable indent */
import { ScreenHeader } from '@components/ScreenHeader';
import { mockCarpools } from '@mocks/carpool.mock';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import {
  Avatar,
  Box,
  Center,
  FlatList,
  HStack,
  IconButton,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import {
  Car,
  Check,
  MapPin,
  PaperPlaneRight,
  Smiley,
  X,
} from 'phosphor-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Platform } from 'react-native';

type Message = {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: Date;
  type: 'text' | 'location' | 'ride_update' | 'request';
  status?: 'pending' | 'accepted' | 'rejected';
};

type RouteParams = {
  rideId: string;
};

export function RideChat() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const { rideId } = route.params as RouteParams;
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Busca os participantes da carona
  const carpool = mockCarpools.find((c) => c.id === rideId) || mockCarpools[0];
  const participants = carpool.participants;
  const driver = carpool.driver;

  // Mock data com participantes reais
  useEffect(() => {
    setIsLoading(true);

    const demoMessages: Message[] = [
      {
        id: '1',
        text: `Oi pessoal! Vamos sair às ${carpool.ride.departureTime} como combinado?`,
        senderId: driver.id,
        senderName: driver.name,
        senderAvatar: driver.avatar,
        type: 'text',
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: '2',
        text: 'Posso participar da carona?',
        senderId: participants[0].id,
        senderName: participants[0].name,
        senderAvatar: participants[0].avatar,
        type: 'request',
        status: 'pending',
        timestamp: new Date(Date.now() - 82800000),
      },
      {
        id: '3',
        text: 'Local de encontro confirmado: ' + carpool.ride.origin,
        senderId: 'system',
        senderName: 'Sistema',
        type: 'location',
        timestamp: new Date(Date.now() - 79200000),
      },
      {
        id: '4',
        text: `Carona ${carpool.ride.rideType === 'ida' ? 'para' : 'de'} ${carpool.ride.destination} confirmada`,
        senderId: 'system',
        senderName: 'Sistema',
        type: 'ride_update',
        timestamp: new Date(Date.now() - 72000000),
      },
    ];

    setTimeout(() => {
      setMessages(demoMessages);
      setIsLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }, [rideId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      senderId: 'currentUser', // ID do usuário atual
      senderName: 'Você',
      type: 'text',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage('');

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleRequestAction = (
    messageId: string,
    action: 'accept' | 'reject'
  ) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              type: 'request',
              status: action === 'accept' ? 'accepted' : 'rejected',
              text:
                action === 'accept'
                  ? 'Solicitação aceita!'
                  : 'Solicitação recusada',
            }
          : msg
      )
    );
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = item.senderId === 'currentUser';
    const isSystem = item.senderId === 'system';
    const isRequest = item.type === 'request';

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          marginBottom: 12,
          alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
        }}
      >
        <HStack space={2} alignItems="flex-end" maxWidth="80%">
          {!isCurrentUser && !isSystem && (
            <Avatar size="xs" source={{ uri: item.senderAvatar }}>
              {item.senderName.charAt(0)}
            </Avatar>
          )}

          <VStack space={1}>
            {!isCurrentUser && !isSystem && (
              <Text fontSize="xs" color="gray.400">
                {item.senderName}
              </Text>
            )}

            <Box
              bg={
                isCurrentUser ? 'green.700' : isSystem ? 'gray.600' : 'gray.500'
              }
              px={3}
              py={2}
              rounded="xl"
              borderBottomRightRadius={isCurrentUser ? 0 : 'xl'}
              borderBottomLeftRadius={isCurrentUser ? 'xl' : 0}
            >
              {isRequest ? (
                <VStack space={2}>
                  <Text color="gray.100">{item.text}</Text>
                  {item.status === 'pending' && (
                    <HStack space={2}>
                      <IconButton
                        icon={<Check size={16} color={colors.green[500]} />}
                        onPress={() => handleRequestAction(item.id, 'accept')}
                        size="sm"
                        variant="ghost"
                      />
                      <IconButton
                        icon={<X size={16} color={colors.red[500]} />}
                        onPress={() => handleRequestAction(item.id, 'reject')}
                        size="sm"
                        variant="ghost"
                      />
                    </HStack>
                  )}
                </VStack>
              ) : item.type === 'location' ? (
                <HStack alignItems="center" space={2}>
                  <MapPin size={16} color={colors.green[500]} />
                  <Text color="green.400">{item.text}</Text>
                </HStack>
              ) : item.type === 'ride_update' ? (
                <HStack alignItems="center" space={2}>
                  <Car size={16} color={colors.blue[300]} />
                  <Text color="blue.300">{item.text}</Text>
                </HStack>
              ) : (
                <Text color="gray.100">{item.text}</Text>
              )}
            </Box>

            <Text
              fontSize="xs"
              color="gray.500"
              textAlign={isCurrentUser ? 'right' : 'left'}
            >
              {item.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </VStack>
        </HStack>
      </Animated.View>
    );
  };

  return (
    <VStack flex={1} bg="gray.700" safeAreaBottom>
      <ScreenHeader
        title={`Chat - ${carpool.vehicle.licensePlate}`}
        showBackButton
        onPress={() => navigation.goBack()}
      />

      {isLoading ? (
        <VStack flex={1} justifyContent="center" alignItems="center" space={2}>
          <Text color="gray.300">Carregando conversa...</Text>
        </VStack>
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            flex={1}
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={renderMessage}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            onLayout={() => flatListRef.current?.scrollToEnd()}
            ListEmptyComponent={
              <Center flex={1}>
                <Text color="gray.400">Nenhuma mensagem ainda</Text>
              </Center>
            }
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <HStack
              bg="gray.600"
              p={3}
              space={2}
              alignItems="center"
              safeAreaBottom
            >
              <IconButton
                icon={<Smiley size={24} color={colors.gray[300]} />}
                variant="ghost"
              />

              <Input
                flex={1}
                placeholder="Digite sua mensagem..."
                placeholderTextColor="gray.400"
                color="gray.100"
                bg="gray.700"
                borderWidth={0}
                _focus={{
                  bg: 'gray.700',
                  borderWidth: 1,
                  borderColor: 'green.500',
                }}
                value={newMessage}
                onChangeText={setNewMessage}
                onSubmitEditing={handleSendMessage}
              />

              <Pressable
                onPress={handleSendMessage}
                disabled={newMessage.trim() === ''}
                opacity={newMessage.trim() === '' ? 0.5 : 1}
                p={2}
              >
                <PaperPlaneRight
                  size={24}
                  color={
                    newMessage.trim() === ''
                      ? colors.gray[300]
                      : colors.green[500]
                  }
                />
              </Pressable>
            </HStack>
          </KeyboardAvoidingView>
        </>
      )}
    </VStack>
  );
}
