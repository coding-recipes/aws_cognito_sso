import { extendTheme } from '@chakra-ui/react'

const settings = {
  allowedImgTypes: ["image/jpeg", "image/jpg", "image/png"],
  size: {
    containerWidht: "1200px",
  },
  colorTheme: {
    green: {
      100: "#A5D9C8",
      200: "#A5D9C8",
      300: "#A5D9C8",
      400: "#A5D9C8",
      500: "#93cfbb",
      600: "#82c5af",
      700: "#72b9a2",
      800: "#5b9f89",
      900: "#448b74",
    }
  }
}

export const theme = extendTheme({
  initialColorMode: 'dark',
  colors: settings.colorTheme,
  fonts: {
    heading: ` 'Nunito', sans-serif`,
    body: ` 'Nunito', sans-serif`,
  },
  styles: { global: { body: { bg: "#F2F2F2" } } }
})

