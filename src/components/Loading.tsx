import { Center, Spinner } from 'native-base'
import React from 'react'

export function Loading() {
  return (
    <Center flex={1} bg="gray.700">
      <Spinner
        size="large"
        color="green.400" />
    </Center>
  )
}
