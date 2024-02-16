import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: 'light', // Initial color mode (light or dark)
    useSystemColorMode: false, // Use system color mode (optional)
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
      // Define button styles
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "full",
      },
      // Define different button variants
      variants: {
        solid: {
          bg: "wine.red", // Background color for light mode
          color: "white", // Text color for light mode
          borderColor: "wine.red", // Border color on hover for light mode
          borderWidth: "1px", // Border width
          borderStyle: "solid", // Border style
          transition: "0.25s",
          _hover: {
            bg: "white", 
            color: "wine.red",
            borderColor: "wine.red", // Border color on hover for light mode
            borderWidth: "1px", // Border width
            borderStyle: "solid", // Border style
          },
        },
      },
    },
    Text: {
      // Define text styles
      baseStyle: {
        fontFamily: "body",
      },
    },
    Link: {
      // Define link styles
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
