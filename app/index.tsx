import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { Loading } from './components/Loading';
import theme from './theme';

export default function App() {
  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      {loaded ? (
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <View>
            <Text>Open up index.tsx to start working on your app!</Text>
          </View>
        </ThemeProvider>
      ) : (
        <Loading />
      )}
    </>
  );
}
