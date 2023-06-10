import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { Entypo } from "@expo/vector-icons";

import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";

type ExerciseCardProps = TouchableOpacityProps & {
  data: ExerciseDTO;
}

export function ExerciseCard({ data, ...othersProps }: ExerciseCardProps) {
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
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }} 
          alt={data.name}
          w={16}
          h={16}
          rounded="md"
          resizeMode="cover"
        /> 

        <VStack flex={1}>
          <Heading color="white" fontSize="lg" fontFamily="heading">{data.name}</Heading>
          <Text color="gray.200" fontSize="sm" mt={1} numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
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