import { useToast } from "native-base"

type Message = {
  title: string;
}

export const useMessage = () => {
  const toast = useToast()

  function errorMessage({ title }: Message){
    return toast.show({
      bg: "red.500",
      color: "gray.100",
      placement: "top",
      title,
    })
  }

  return {
    errorMessage,
  }
}