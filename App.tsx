// src/App.tsx
import { Loading } from '@components/Loading';
import { AuthContextProvider } from '@contexts/AuthContext';
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { mockAuthTokens, mockUser } from '@mocks/user.mock';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Routes } from '@routes/index';
import { AUTH_TOKEN_STORAGE, USER_STORAGE } from '@storage/storageConfig';
import { THEME } from '@theme';
import * as NavigationBar from 'expo-navigation-bar';
import { NativeBaseProvider } from 'native-base';
import { useEffect, useState } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Ignorar logs específicos (opcional)
LogBox.ignoreLogs([
  'In React 18, SSRProvider is not necessary and is a noop.',
  'Non-serializable values were found in the navigation state',
]);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    async function prepare() {
      try {
        console.log('Inicializando mocks...');
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(mockUser));
        await AsyncStorage.setItem(
          AUTH_TOKEN_STORAGE,
          JSON.stringify(mockAuthTokens)
        );

        await new Promise((resolve) => setTimeout(resolve, 500));
        // Verifique se os dados foram salvos
        const user = await AsyncStorage.getItem(USER_STORAGE);
        const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
        console.log('Dados salvos:', { user, token });
        await new Promise((resolve) => setTimeout(resolve, 500));

        await NavigationBar.setVisibilityAsync('hidden');
      } catch (e) {
        console.error('Erro na inicialização:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded || !appIsReady) {
    return (
      <NativeBaseProvider theme={THEME}>
        <Loading message="Inicializando..." />
      </NativeBaseProvider>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={THEME}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <AuthContextProvider>
          {fontsLoaded && appIsReady ? (
            <Routes />
          ) : (
            <Loading message="Carregando fontes e dados de autenticação..." />
          )}
        </AuthContextProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
