import { Input as NBInput, IInputProps } from "native-base";

export function Input({ ...props }: IInputProps) {
  return (
    <NBInput
      bg="gray.700"
      px={4}
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        bg: "gray.700",
        borderWidth: 1,
        borderColor: 'green.500'
      }}
      {...props}
    />
  )
}
