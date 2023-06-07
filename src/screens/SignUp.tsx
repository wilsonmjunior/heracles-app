import {useNavigation} from "@react-navigation/native";
import {
	Center,
	Heading,
	Image,
	ScrollView,
	Text,
	VStack,
} from "native-base";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {BackgroundImg, LogoSvg} from "@assets/index";
import {Button} from "@components/Button";
import {Input} from "@components/Input";
import { useMessage } from "@hooks/message.hook";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

type SignUpFormData = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const signUpSchema = yup.object({
	name: yup.string().required("Informe seu nome."), 
	email: yup.string().required("Informe seu e-mail.").email("E-mail inválido"), 
	password: yup.string().required("Informe a senha.").min(6, "A senha deve conter no mínimo 6 caracteres."), 
	confirmPassword: yup.string().required("Confirme a senha.").oneOf([yup.ref('password')], "As senhas não conferem.")
})

export function SignUp() {
	const navigation = useNavigation();
	const {control, formState: { errors }, handleSubmit} = useForm<SignUpFormData>({
		resolver: yupResolver(signUpSchema),
	});

	const { showErrorMessage } = useMessage()

	function handleBack() {
		navigation.goBack();
	}

	async function handleSignUp(values: SignUpFormData) {
		try {
			const { email, name, password } = values
			await api.post("users", { email, name, password })
		} catch (error) {
			const isAppError = error instanceof AppError;
			const title = isAppError ? error.message : "Não foi possível cria a conta. Tente novamente mais tarde.";
			
			showErrorMessage({ title })
		}
	}

	return (
		<ScrollView
			contentContainerStyle={{flexGrow: 1}}
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
						fontSize="xl"
						fontFamily="heading"
						mb="6"
					>
            Crie a sua conta
					</Heading>
				</Center>

				<Center>
					<VStack w="full" space={4}>
						<Controller
							name="name"
							control={control}
							render={({field: {value, onChange}}) => (
								<Input
									placeholder="Nome"
									value={value}
									onChangeText={onChange}
									error={errors.name?.message}
								/>
							)}
						/>

						<Controller
							name="email"
							control={control}
							render={({field: {value, onChange}}) => (
								<Input
									placeholder="E-mail"
									value={value}
									keyboardType="email-address"
									error={errors.email?.message}
									onChangeText={onChange}
								/>
							)}
						/>

						<Controller
							name="password"
							control={control}
							render={({field: {value, onChange}}) => (
								<Input
									placeholder="Senha"
									value={value}
									secureTextEntry
									error={errors.password?.message}
									onChangeText={onChange}
								/>
							)}
						/>

						<Controller
							name="confirmPassword"
							control={control}
							render={({field: {value, onChange}}) => (
								<Input
									placeholder="Confirmar a senha"
									value={value}
									secureTextEntry
									onChangeText={onChange}
									error={errors.confirmPassword?.message}
									onSubmitEditing={handleSubmit(handleSignUp)}
									returnKeyType="send"
								/>
							)}
						/>

						<Button
							title="Criar e acessar"
							onPress={handleSubmit(handleSignUp)}
						/>
					</VStack>
				</Center>

				<Button
					title="Voltar para o login"
					variant="outline"
					mt={16}
					onPress={handleBack}
				/>
			</VStack>
		</ScrollView>
	);
}
