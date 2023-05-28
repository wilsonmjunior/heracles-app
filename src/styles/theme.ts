import { extendTheme } from "native-base"

export const colors = {
  background: '#121214',
  shape_main: '#202024',
}

export const theme = extendTheme({
  colors: {
    green: {
      700: '#00875F',
      500: '#00B37E',
    },
    gray: {
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6'
    },
    white: '#FFFFFF',
    red: {
      500: '#F75A68'
    },
  },
  fontSizes: {
    14: 56,
    33: 148,
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
  },
})