import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { HStack, Heading, Icon, Image, Text, VStack } from "native-base"
import { Entypo } from "@expo/vector-icons"

type ExerciseCardProps = TouchableOpacityProps & {
  name: string;
}

export function ExerciseCard({ name, ...othersProps }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...othersProps}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2} 
        pr={4}
        rounded="md" 
        space={4}
      >
        <Image
          source={{ uri: 'https://www.origym.com.br/upload/remada-unilateral-3.png' }} 
          alt={name}
          w={16}
          h={16}
          rounded="md"
          resizeMode="cover"
        /> 

        <VStack flex={1}>
          <Heading color="white" fontSize="lg" fontFamily="heading">{name}</Heading>
          <Text color="gray.200" fontSize="sm" mt={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
        />
      </HStack>
    </TouchableOpacity>
  )
}