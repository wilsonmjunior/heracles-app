import { 
  Input as NBInput,
  IInputProps,
  FormControl
} from "native-base";

type InputProps = IInputProps & {
  error?: string | null;
}

export function Input({ error = null, isInvalid, ...othersProps }: InputProps) {
  const invalid = !!error || isInvalid;

  return (
    <FormControl isInvalid={invalid}>
      <NBInput
        h={14}
        bg="gray.700"
        px={4}
        borderWidth={0}
        fontSize="md"
        fontFamily="body"
        color="white"
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500"
        }}
        _focus={{
          bg: "gray.700",
          borderWidth: 1,
          borderColor: "green.500"
        }}
        {...othersProps}
      />
      <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
