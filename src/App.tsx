import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import React from 'react';
import { NativeBaseProvider, View } from 'native-base';

import { Loading } from '@components/Loading';

import { theme } from './styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      {!fontsLoaded ? <Loading /> : <View />}
    </NativeBaseProvider>
  );
}
