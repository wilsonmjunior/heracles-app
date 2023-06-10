import { TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";

import { BodySvg, SeriesSvg, RepetitionsSvg } from '@assets/index';
import { Button } from '@components/Button';
import { useMessage } from '@hooks/message.hook';
import { AppError } from '@utils/AppError';
import { api } from '@services/api';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { Loading } from '@components/Loading';

type RouteParams = RouteProp<ParamListBase> & {
  params: {
    id: string;
  }
}

export function Exercise() {
  const { goBack } = useNavigation();
  const { params } = useRoute<RouteParams>();

  const [exercise, setExercise] = useState({} as ExerciseDTO);

  const { showErrorMessage } = useMessage();

  function handleGoBack() {
    goBack();
  }

  useEffect(() => {
    async function fetchExercise(id: string) {
      try {
        const response = await api.get(`/exercises/${id}`);
        setExercise(response.data);
      } catch(error) {
        const isAppError = error instanceof AppError;
        const title = isAppError && error.message ? error.message : 'Não foi possível carregar os detalhes do exercício.';

        showErrorMessage({ title });
      }
    }
    
    if (params?.id) {
      fetchExercise(params.id)
    }
  }, [params]);

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
          <Skeleton isLoaded={!!exercise.id} rounded="md">
            <Heading
              color="gray.100"
              fontSize="lg"
              fontFamily="heading"
              flexShrink={1}
            >
              {exercise.name}
            </Heading>

            <HStack alignItems="center">
              <BodySvg />
              <Text color="gray.200" ml={1} textTransform="capitalize">
                {exercise.group}
              </Text>
            </HStack>
          </Skeleton>
        </HStack>
      </VStack>

      <ScrollView
        _contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        <VStack mt={8} px={8} space={3}>
          <Skeleton isLoaded={!!exercise.id} height={80} rounded="md">
            <Box rounded="lg" overflow="hidden">
              <Image
                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }} 
                alt="Imagem do exercício"
                w="full"
                height={80}
                resizeMode='cover'
              />
            </Box>
          </Skeleton>

          <Box
            bg="gray.600"
            px={4}
            pt={5}
            pb={4}
            rounded="lg"
          >
            <HStack alignItems="center" justifyContent="space-around" mb={6}>
              <Skeleton isLoaded={!!exercise.id} rounded="md">
                <HStack>
                  <SeriesSvg />
                  <Text color="gray.100" ml={2}>
                    {exercise.series} Series
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.100" ml={2}>
                    {exercise.repetitions} Repetitions
                  </Text>
                </HStack>
              </Skeleton>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
