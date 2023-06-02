import { TouchableOpacity } from "react-native"
import {
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "native-base"
import { MaterialIcons } from "@expo/vector-icons"

import { UserPhoto } from "./UserPhoto"

export default function HomeHeader() {
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
        source={{ uri: "https://github.com/wilsonmjunior.png" }} 
        alt="Imagem do usuário"
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">Olá,</Text> 
        <Heading color="gray.100" fontSize="md">Wilson</Heading>
      </VStack>

      <TouchableOpacity>
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
