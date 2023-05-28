import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import React from 'react';
import { NativeBaseProvider } from 'native-base';

import { Loading } from '@components/Loading';
import { SignIn } from '@screens/SignIn';

import { theme } from './styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      {!fontsLoaded ? <Loading /> : <SignIn />}
    </NativeBaseProvider>
  );
}
