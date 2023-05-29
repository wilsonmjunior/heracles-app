import {
  Button as NBButton,
  IButtonProps,
  Text,
} from "native-base";

type ButtonProps = IButtonProps & {
  title: string;
}

export function Button({ title, ...props }: ButtonProps) {
  return (
    <NBButton
      w="full"
      h={14}
      bg="green.700"
      rounded="sm"
      _pressed={{
        bg: "green.500"
      }}
      {...props}
    >
      <Text
        color="white"
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </NBButton>
  )
}
