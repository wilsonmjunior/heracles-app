import { HStack, Heading, Text, VStack } from "native-base"
import React from "react";

type HistoryCardProps = {
}

export function HistoryCard() {
  return (
    <HStack 
      w="full"
      px={5} 
      py={4}
      mb={3}
      bg="gray.600" 
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack>
        <Heading color="white" fontSize="xl" textTransform="capitalize">
          Costas
        </Heading>

        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md">
        08:56
      </Text>
    </HStack>
  )
}
