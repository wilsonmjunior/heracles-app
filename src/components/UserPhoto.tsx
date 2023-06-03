import { IImageProps, Image } from "native-base"

type UserPhotoProps = IImageProps & {
  size: number;
}

export function UserPhoto({ size, ...otherProps }: UserPhotoProps) {
  return (
    <Image 
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...otherProps}
    />
  )
}