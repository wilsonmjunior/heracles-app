import { TouchableOpacity } from "react-native";
import {
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { UserPhoto } from "./UserPhoto";
import { useAuth } from "@hooks/auth.hook";
import { UserPhotoDefaultImg } from "@assets/index";

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <HStack
      bg="gray.600"
      alignItems="center"
      pt={16}
      pb={5}
      px={8}
      space={4}
    >
      <UserPhoto 
        size={16} 
        source={user.avatar ? { uri: user.avatar } : UserPhotoDefaultImg} 
        alt="Imagem do usuário"
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">Olá,</Text> 
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon 
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={6}
        />
      </TouchableOpacity>
    </HStack>
  )
}
