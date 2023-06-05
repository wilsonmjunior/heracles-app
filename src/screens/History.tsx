import { useState } from 'react'
import {
  Heading,
  SectionList,
  Text,
  VStack
} from 'native-base'

import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryCard } from '@components/HistoryCard'

const data = [
  {
    title: '02/06/23',
    data: ['Costas', 'Trapézio', 'Biceps'],
  },
  {
    title: '03/06/23',
    data: ['Costas', 'Trapézio', 'Biceps'],
  },
]

export function History() {
  const [exercises, setExercises] = useState(data)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList 
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <HistoryCard /> 
        )}
        renderSectionHeader={({ section: { title } }) => (
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
        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
        ListEmptyComponent={() => (
          <Text color="gray.200" fontSize="sm" textAlign="center">
            Não há exercícios registrados ainda. {'\n'}
            Bora treinar?
          </Text>
        )}
      />
    </VStack>
  )
}
