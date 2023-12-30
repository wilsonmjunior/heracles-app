import { useState } from 'react'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { useAuth } from '@hooks/auth.hook'
import { useMessage } from '@hooks/message.hook'
import { UserPhotoDefaultImg } from '@assets/index'
import { api } from '@services/api'

const IMAGE_SIZE = 33

export function Profile() {
  const { showErrorMessage, showSuccessMessage } = useMessage()

  const [photoIsLoaded, setPhotoIsLoaded] = useState(true)
  const [userPhoto, setUserPhoto] = useState("")

  const { user } = useAuth()

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
      
      if (photoSelected.assets.length && photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
        if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 2) {
          return showErrorMessage({ 
            title: "Essa imagem é muito grande. Escolha uma de até 2MB" 
          })
        }

        const fileExtension = photoSelected.assets[0].uri.split('.').pop()

        const photoFile = {
          name: (`${user.name}.${fileExtension}`).toLocaleLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`
        } as any

        console.log('photoFile:: ', api.defaults.headers.common['Authorization'])
        const userPhotoUploadForm = new FormData()
        userPhotoUploadForm.append('avatar', photoFile)


        await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: { 
            'Content-Type': 'multipart/form-data',
          }
        })

        setUserPhoto(photoSelected.assets[0].uri)

        showSuccessMessage({
          title: 'Foto de perfil atualizada.'
        })
      }
    } catch (error) {
      console.log('image error: ', error)
      showErrorMessage({
        title: "Erro ao carregar a imagem.",
      })
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
              source={userPhoto !== "" ? { uri: userPhoto } : UserPhotoDefaultImg} 
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

          <Heading
            color="gray.100"
            fontSize="md"
            fontFamily="heading"
            mt={35}
          >
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
