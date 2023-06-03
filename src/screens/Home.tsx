import { useState } from 'react'
import { HStack, FlatList, VStack, Box, Heading, Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

const GROUPS = ["costas", "biceps", "triceps", "ombros"]
const EXERCISES = [
  "Remada unilateral", 
  "Remada curvada", 
  "Puxada frontal", 
  "Puxada alta", 
  "Levantamento terra",
]

export function Home() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  const [exercises, setExercises] = useState<string[]>(EXERCISES)
  const [groups, setGroups] = useState<string[]>(GROUPS)
  const [groupSelected, setGroupSelected] = useState('')

  function handleNavigateToExercise() {
    navigate("exercise")
  }

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

      <VStack flex={1} px={8}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mb={5}
        >
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            4
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <ExerciseCard name={item} onPress={handleNavigateToExercise} />
          )}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
          ItemSeparatorComponent={() => <Box height={4} />}
        />
      </VStack>
    </VStack>
  )
}
