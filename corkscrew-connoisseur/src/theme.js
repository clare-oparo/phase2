import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Set initial color mode to light
  },
  fonts: {
    heading: "Playfair Display, serif",
    body: "Montserrat, sans-serif",
  },
  colors: {
    wine: {
      red: "#8B0000", // Deep red, reminiscent of red wine
      white: "#F5F5F5", // Off-white, like the color of wine labels or corks
      gold: "#FFD700", // Golden, representing the richness of wine
      black: "#000000", // Black, for additional contrast
      blue: "#0000FF", // Blue, for links or primary actions
      yellow: "#FFFF00", // Yellow, for warnings or attention-seeking elements
      purple: "#800080", // Purple, for special or unique elements
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
