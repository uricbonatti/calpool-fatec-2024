import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';

import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';
import { THEME } from '@theme';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthContextProvider } from 'src/context/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={THEME}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? (
          <AuthContextProvider>
            <Routes />
          </AuthContextProvider>
        ) : (
          <Loading />
        )}
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
