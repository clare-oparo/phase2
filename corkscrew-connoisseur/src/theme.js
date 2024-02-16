import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false, // Ensure that the system color mode is not used
  },
  fonts: {
    heading: "Playfair Display, serif",
    body: "Montserrat, sans-serif",
  },
  colors: {
    wine: {
      red: "#8B0000",
      white: "#F5F5F5",
      gold: "#FFD700",
      black: "#000000",
      blue: "#0000FF",
      yellow: "#FFFF00",
      purple: "#800080",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "full",
      },
      variants: {
        solid: {
          bg: "wine.red",
          color: "white",
          borderColor: "wine.red",
          borderWidth: "1px",
          borderStyle: "solid",
          transition: "0.25s",
          _hover: {
            bg: "white",
            color: "wine.red",
            borderColor: "wine.red",
            borderWidth: "1px",
            borderStyle: "solid",
          },
        },
        outline: { // Define the outline variant
          bg: "transparent",
          color: "black",
          borderColor: "black",
          borderWidth: "1px",
          borderStyle: "solid",
          transition: "0.25s",
          _hover: {
            bg: "black",
            color: "white",
          },
        },
      },
    },
    Text: {
      baseStyle: {
        fontFamily: "body",
      },
    },
    Link: {
      baseStyle: {
        color: "wine.red",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

export default theme;
