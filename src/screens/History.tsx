import { useCallback, useState } from 'react';
import {
  Heading,
  SectionList,
  Skeleton,
  Text,
  VStack
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';

import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';
import { HistoryDTO } from '@dtos/HistoryDTO';
import { useMessage } from '@hooks/message.hook';
import { AppError } from '@utils/AppError';
import { api } from '@services/api';

export function History() {
  const [sectionExercises, setSectionExercises] = useState<HistoryDTO[]>([])
  const [isLoaded, setIsLoaded] = useState(false);

  const { showErrorMessage } = useMessage();

  useFocusEffect(useCallback(() => {
    async function fetchHistoryExercises() {
      try {
        setIsLoaded(false);
  
        const response = await api.get<HistoryDTO[]>('/history');
        setSectionExercises(response.data);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const title = isAppError && error.message ? error.message : 'Erro ao carregar histórico de exercícios.';
  
        showErrorMessage({ title });
      } finally {
        setIsLoaded(true);
      }
    }

    fetchHistoryExercises();
  }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <Skeleton
        isLoaded={isLoaded}
        height={132}
        pt={10}
        px={8}
        rounded="md"
      >
        <SectionList 
          sections={sectionExercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section: { title  } }) => (
            <Heading
              color="gray.200"
              fontSize="md"
              fontFamily="heading"
              mt={10}
              mb={3}
            >
              {title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={sectionExercises.length === 0 && { flex: 1, justifyContent: 'center' }}
          ListEmptyComponent={() => (
            <Text color="gray.200" fontSize="sm" textAlign="center">
              Não há exercícios registrados ainda. {'\n'}
              Bora treinar?
            </Text>
          )}
        />
      </Skeleton>
    </VStack>
  )
}
