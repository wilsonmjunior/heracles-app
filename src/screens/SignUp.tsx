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
import { useReducerController } from "@hooks/reducer.hook"

type SignUpParams = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: SignUpParams = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export function SignUp() {
  const navigation = useNavigation()

  const [state, dispatch] = useReducerController(initialState)

  function handleBack() {
    navigation.goBack()
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
            fontFamily="heading">
            Crie a sua conta
          </Heading>
        </Center>

        <Center>
          <VStack w="full" space={4}>
            <Input
              placeholder="Nome"
            />

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              placeholder="Senha"
              secureTextEntry
            />

            <Button
              title="Acessar"
            />
          </VStack>
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={24}
          onPress={handleBack}
        />
      </VStack>
    </ScrollView>
  )
}
