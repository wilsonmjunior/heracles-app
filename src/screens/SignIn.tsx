import { useState } from "react";
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
import { useMessage } from "@hooks/message.hook";
import { AuthNavigatorRouteProps } from "@routes/auth.routes";
import { AppError } from "@utils/AppError";

type SignInFormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRouteProps>();

  const { 
    control, 
    formState: { errors },
    handleSubmit
  } = useForm<SignInFormData>();

  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const { showErrorMessage } = useMessage();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  async function handleSignIn({ email, password }: SignInFormData) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível logar. Tente novamente mais tarde.";

      showErrorMessage({ title });
    } finally {
      setIsLoading(false);
    }
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
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="E-mail"
                  value={value}
                  error={errors.email && errors.email.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  onChangeText={onChange}
                />
              )}
            />
           
            <Controller 
              name="password"
              control={control}
              rules={{ required: "Informe a senha." }}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Senha"
                  value={value}
                  secureTextEntry
                  error={errors.password && errors.password.message}
                  autoComplete="password"
                  onChangeText={onChange}
                />
              )}
            />

            <Button
              title="Acessar"
              isLoading={isLoading}
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
