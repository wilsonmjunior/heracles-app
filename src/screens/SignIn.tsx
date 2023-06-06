import { useNavigation } from "@react-navigation/native";
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack
} from "native-base";
import { Controller, useForm } from "react-hook-form";

import { BackgroundImg, LogoSvg } from "@assets/index";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useAuth } from "@hooks/auth.hook";
import { AuthNavigatorRouteProps } from "@routes/auth.routes";

type SignInFormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRouteProps>();

  const { control, formState: { errors }, handleSubmit } = useForm<SignInFormData>();

  const { user } = useAuth();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  function handleSignIn() {

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
            <Controller
              name="email"
              control={control} 
              rules={{ required: "Informe o seu e-mail." }}
              render={() => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email && errors.email.message}
                />
              )}
            />
           
            <Controller 
              name="password"
              control={control}
              rules={{ required: "Informe a senha." }}
              render={() => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  error={errors.password && errors.password.message}
                />
              )}
            />

            <Button
              title="Acessar"
              onPress={handleSubmit(handleSignIn)}
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
