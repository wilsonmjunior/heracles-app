import { useCallback, useEffect, useState } from 'react';
import { HStack, FlatList, VStack, Box, Heading, Text } from 'native-base';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { Loading } from '@components/Loading';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { useMessage } from '@hooks/message.hook';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

export function Home() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const [isLoadingExercise, setIsLoadingExercise] = useState(true);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState('');

  const { showErrorMessage } = useMessage();

  function handleNavigateToExercise(exerciseId: string) {
    navigate("exercise", { exerciseId });
  }

  useFocusEffect(useCallback(() => {
    async function fetchExercisesByGroup() { 
      try {
        const response = await api.get(`/exercises/bygroup/${groupSelected}`);
        setExercises(response.data);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const title = isAppError && error.message ? error.message : 'Não foi possível carregar os exercícios.';
        
        showErrorMessage({ title });
      } finally {
        setIsLoadingExercise(false);
      }
    }
    
    if (groupSelected) {
      setIsLoadingExercise(true);
      fetchExercisesByGroup();
    }
  }, [groupSelected]));

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await api.get('/groups');
        setGroups(response.data);
        setGroupSelected(response.data[0]);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const title = isAppError && error.message ? error.message : 'Não foi possível carregar os grupos musculares.';
        
        showErrorMessage({ title });
      }
    }


    fetchGroups();
  }, []);

  return (
    <VStack flex={1}>
      <HomeHeader />
      
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()} 
            onPress={() => setGroupSelected(item)}  
          />
        )}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        my={10}
        minH={10}
        maxH={10}
        _contentContainerStyle={{  px: 8 }}
        ItemSeparatorComponent={() => <Box width={4} />}
      />

      {
        isLoadingExercise ? (
          <Loading />
        ) : (
          <VStack flex={1} px={8}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              mb={5}
            >
              <Heading color="gray.200" fontSize="md" fontFamily="heading">
                Exercícios
              </Heading>
              <Text color="gray.200" fontSize="sm">
                4
              </Text>
            </HStack>
    
            <FlatList
              data={exercises}
              renderItem={({ item }) => (
                <ExerciseCard data={item} onPress={() => handleNavigateToExercise(item.id)} />
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{
                paddingBottom: 20,
              }}
              ItemSeparatorComponent={() => <Box height={4} />}
            />
          </VStack>
        )
      }
    </VStack>
  )
}
