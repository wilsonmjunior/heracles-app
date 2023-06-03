import { TouchableOpacity } from 'react-native'
import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Feather } from "@expo/vector-icons"

import { BodySvg, SeriesSvg, RepetitionsSvg } from '@assets/index'
import { Button } from '@components/Button'
import React from 'react'

export function Exercise() {
  const {goBack } = useNavigation()
  function handleGoBack() {
    goBack()
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12} pb={8}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon 
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>

        <HStack alignItems="center" justifyContent="space-between" mt={2}>
          <Heading color="gray.100" fontSize="lg" flexShrink={1}>
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView
        _contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <VStack mt={8} px={8} space={3}>
          <Image
            source={{ uri: 'https://www.origym.com.br/upload/remada-unilateral-3.png' }} 
            alt="Imagem do exercício"
            w="full"
            height={80}
            resizeMode='cover'
            rounded="lg"
          />

          <Box
            bg="gray.600"
            px={4}
            pt={5}
            pb={4}
            rounded="lg"
          >
            <HStack alignItems="center" justifyContent="space-around" mb={6}>
              <HStack>
                <SeriesSvg />
                <Text color="gray.100" ml={2}>
                  4 Series
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text color="gray.100" ml={2}>
                  15 Repetitions
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
