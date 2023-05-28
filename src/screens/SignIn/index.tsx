import { Image, VStack } from "native-base";
import { BackgroundImg } from "@assets/index";

export function SignIn() {

  return (
    <VStack flex={1} bg="gray.700">
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute"
      />
    </VStack>
  )
}
