import { useToast } from "native-base"

type Message = {
  title: string;
}

export const useMessage = () => {
  const toast = useToast()

  function showErrorMessage({ title }: Message){
    return toast.show({
      bg: "red.500",
      color: "gray.100",
      placement: "top",
      title,
    })
  }

  function showSuccessMessage({ title }: Message){
    return toast.show({
      bg: "green.500",
      color: "gray.100",
      placement: "top",
      title,
    })
  }

  return {
    showErrorMessage,
    showSuccessMessage,
  }
}