import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import ButtonConfig from "./Button.config";

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#E2DEFD",
      200: "#C4BDFC",
      300: "#A49AF7",
      400: "#8A7FEF",
      500: "#6356E5",
      600: "#493EC4",
      700: "#342BA4",
      800: "#221B84",
      900: "#15106D",
    },
    success: {
      100: "#E6FBD4",
      200: "#C8F7AB",
      300: "#9EE77D",
      400: "#74D059",
      500: "#3FB22A",
      600: "#28991E",
      700: "#158015",
      800: "#0D6714",
      900: "#085514",
    },
    info: {
      100: "#CCF9FE",
      200: "#99EEFE",
      300: "#66DBFE",
      400: "#40C6FD",
      500: "#02A4FC",
      600: "#017FD8",
      700: "#015FB5",
      800: "#004392",
      900: "#003078",
    },
    warning: {
      100: "#FFFACD",
      200: "#FFF49B",
      300: "#FFEC69",
      400: "#FFE543",
      500: "#FFD905",
      600: "#DBB703",
      700: "#B79602",
      800: "#937601",
      900: "#7A6000",
    },
    danger: {
      100: "#FFE7D3",
      200: "#FFC9A9",
      300: "#FFA57E",
      400: "#FF825D",
      500: "#FF4828",
      600: "#DB2A1D",
      700: "#B71415",
      800: "#930C18",
      900: "#7A071A",
    },
  },
  fonts: {
    body: "Poppins",
    heading: "Poppins",
    mono: "Poppins",
  },
  initialColorMode: "light",
  useSystemColorMode: true,
  styles: {
    global: (props) => ({
      "html, body": {
        backgroundColor: mode("white", "gray.800")(props),
      },
      "a:hover": {
        color: "inherit",
        textDecoration: "none",
      },
    }),
  },
  components: {
    Button: ButtonConfig,
  },
});
