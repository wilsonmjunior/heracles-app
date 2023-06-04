import { useNavigation } from "@react-navigation/native"
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack
} from "native-base"

import { BackgroundImg, LogoSvg } from "@assets/index"
import { Button } from "@components/Button"
import { Input } from "@components/Input"
import { AuthNavigatorRouteProps } from "@routes/auth.routes"
import { FieldState, useReducerController } from "@hooks/reducer.hook"

type SignInState = {
  email: FieldState;
  password: FieldState;
}

const initialState: SignInState = {
  email: { error: '', value: '' },
  password: { error: '', value: '' },
}

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRouteProps>()

  const [state, dispatch] = useReducerController(initialState)

  const handleChangeText = (field: keyof SignInState, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', field, value })
  };

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            color="gray.100"
            mb="6"
            fontSize="xl"
            fontFamily="heading"
          >
            Acesso a conta
          </Heading>
        </Center>

        <Center>
          <VStack w="full" space={4}>
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(value) => handleChangeText('email', value)}
            />
            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={(value) => handleChangeText('password', value)}
            />

            <Button
              title="Acessar"
            />
          </VStack>
        </Center>

        <Center mt={32}>
          <Text fontFamily="body" fontSize="sm" color="gray.100">
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            mt={4}
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
