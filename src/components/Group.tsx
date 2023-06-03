import { Text, Pressable, IPressableProps } from "native-base"
import { useState } from "react";

type GroupProps = IPressableProps & {
  name: string;
  isActive?: boolean;
}

export function Group({ name, isActive, ...othersProps }: GroupProps) {
  return (
    <Pressable
      w={24}
      h={10}
      rounded="md"
      bg="gray.600"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      isPressed={isActive}
      _pressed={{
        borderWidth: 1,
        borderColor: "green.500"
      }}
      {...othersProps}
    >
      <Text
        color={isActive ? "green.500" : "gray.200"}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Pressable>
  )
}
