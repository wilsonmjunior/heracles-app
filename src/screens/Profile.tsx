import {
  Alert,
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"

import { UserPhoto } from '@components/UserPhoto'
import { ScreenHeader } from '@components/ScreenHeader'
import { useState } from 'react'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

const IMAGE_SIZE = 33

export function Profile() {
  const toast = useToast()

  const [photoIsLoaded, setPhotoIsLoaded] = useState(true)
  const [userPhoto, setUserPhoto] = useState("https://github.com/wilsonmjunior.png")

  async function handleChangeUserPhoto() {
    try {
      setPhotoIsLoaded(false)

      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })
  
      if (photoSelected.canceled) {
        return
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
        if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 2) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 2MB",
            bg: "red.500",
            color: "gray.100",
            placement: "top"
          })
        }
        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoaded(true)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView
        _contentContainerStyle={{
          paddingBottom: 20,
        }}
      >  
        <Center mt={6} px={10}>
          <Skeleton
            w={IMAGE_SIZE}
            h={IMAGE_SIZE}
            rounded="full"
            startColor="gray.500"
            endColor="gray.400"
            isLoaded={photoIsLoaded}
          >
            <UserPhoto 
              size={IMAGE_SIZE} 
              source={{ uri: userPhoto }} 
              alt="Foto do usuário"
              mb={3}
            />
          </Skeleton>

          <TouchableOpacity onPress={handleChangeUserPhoto}>
            <Text color="green.500" fontWeight="bold" fontSize="md"> 
              Alterar foto
            </Text>
          </TouchableOpacity>
        </Center>

        <VStack space={4} mt={9} px={10}>
          <Input placeholder='Nome' w="full" bg="gray.600" />
          <Input
            placeholder='E-mail'
            w="full"
            bg="gray.600"
            isDisabled
          />

          <Heading color="gray.100" fontSize="md" mt={35}>
            Alterar senha
          </Heading>
          <Input
            placeholder='Senha antiga'
            w="full"
            bg="gray.600"
          />
          <Input placeholder='Nova senha' w="full" bg="gray.600" />
          <Input placeholder='Confirmar nova senha' w="full" bg="gray.600" />
          <Button title='Atualizar' mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
