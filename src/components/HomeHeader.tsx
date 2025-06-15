import { MaterialIcons } from '@expo/vector-icons';
import { Box, HStack, Heading, Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { useAuth } from '@hooks/useAuth';

import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { UserPhoto } from './UserPhoto';

export function HomeHeader() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        size={16}
        source={user?.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
        alt="Foto de perfil"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user?.name || ''}
        </Heading>
      </VStack>

      <HStack space={4}>
        <TouchableOpacity onPress={() => navigation.navigate('notifications')}>
          <Box position="relative">
            <Icon
              as={MaterialIcons}
              name="notifications"
              color="gray.200"
              size={6}
            />
            <Box
              position="absolute"
              top={-2}
              right={-2}
              bg="red.500"
              rounded="full"
              w={4}
              h={4}
              alignItems="center"
              justifyContent="center"
            >
              <Text color="white" fontSize="2xs" fontWeight="bold">
                3
              </Text>
            </Box>
          </Box>
        </TouchableOpacity>

        <TouchableOpacity onPress={signOut}>
          <Icon as={MaterialIcons} name="logout" color="gray.200" size={6} />
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
}
