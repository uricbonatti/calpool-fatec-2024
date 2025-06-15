import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Loading } from '@components/Loading';
import { useAuth } from '@hooks/useAuth';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray['700'];

  if (isLoadingUserStorageData) {
    console.log('Loading user data...');
    return <Loading />;
  }

  if (!user || !user.id) {
  return <AuthRoutes />;
}

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
