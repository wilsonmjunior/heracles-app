import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar } from 'native-base';

import { Loading } from '@components/Loading';
import { AuthProvider } from '@contexts/AuthContext';

import { theme } from './styles/theme';
import { Routes } from './routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {!fontsLoaded ? <Loading /> : (
        <AuthProvider>
          <Routes />
        </AuthProvider>
      )}
    </NativeBaseProvider>
  );
}
