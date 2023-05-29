import {
  Button as NBButton,
  IButtonProps,
  Text,
} from "native-base";

type ButtonProps = IButtonProps & {
  title: string;
  variant?: "outline" | "solid";
}

export function Button({
  title,
  variant = "solid",
  ...othersProps
}: ButtonProps) {
  return (
    <NBButton
      w="full"
      h={14}
      bg={variant === "outline" ? "transparent" : "green.700"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="green.700"
      rounded="sm"
      _pressed={{
        bg: variant === "outline" ? "gray.500" : "green.500"
      }}
      {...othersProps}
    >
      <Text
        color={variant === "outline" ? "green.500" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </NBButton >
  )
}
