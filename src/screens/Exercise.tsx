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

type RouteParams = RouteProp<ParamListBase> & {
  params: {
    exerciseId: string;
  }
}

export function Exercise() {
  const { goBack } = useNavigation();
  const { params: { exerciseId } } = useRoute<RouteParams>();

  const [exercise, setExercise] = useState({} as ExerciseDTO);
  const [completedExercise, setCompletedExercise] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { showErrorMessage, showSuccessMessage } = useMessage();

  function handleGoBack() {
    goBack();
  }

  async function handleRegisterHistory() {
    try {
      setCompletedExercise(true);

      await api.post('/history', { exercise_id: exerciseId });

      showSuccessMessage({ title: 'Parabéns! Exercício registrado com sucesso.' })
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError && error.message ? error.message : 'Não foi possível registrar exercício.';

      showErrorMessage({ title });
    } finally {
      setCompletedExercise(false);
    }
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
      } finally {
        setTimeout(() => {
          setIsLoading(true);
        }, 1 * 1000);
      }
    }
    
    if (exerciseId) {
      setIsLoading(false);
      fetchExercise(exerciseId)
    }
  }, [exerciseId]);

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
          <Skeleton isLoaded={isLoading} rounded="md">
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
          <Skeleton isLoaded={isLoading} height={80} rounded="md">
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

          <Skeleton
            height={32}
            isLoaded={isLoading} 
            rounded="md"
          >
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
                    {exercise.series} Series
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.100" ml={2}>
                    {exercise.repetitions} Repetitions
                  </Text>
                </HStack>
              </HStack>

            <Button 
              title="Marcar como realizado"
              isLoading={completedExercise}
              onPress={handleRegisterHistory}
            />
            </Box>
          </Skeleton>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
