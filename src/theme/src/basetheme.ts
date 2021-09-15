import { palette } from "../utils/basePalette";
import { createTheme } from "./themeFunctions";

export const baseLightTheme = createTheme({
  colors: {
    ...palette,

    mainBackground: palette.neutral100,
    textColor: palette.neutral800,
    buttonTextColor: palette.neutral100,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  typography: {
    h1: {
      fontFamily: "Poppins-Bold",
      fontWeight: "bold",
      fontSize: 42,
      color: "textColor",
    },
    h2: {
      fontFamily: "Poppins-Bold",
      fontWeight: "bold",
      fontSize: 36,
      color: "textColor",
    },
    h3: {
      fontFamily: "Poppins-Bold",
      fontWeight: "bold",
      fontSize: 32,
      color: "textColor",
    },
    h4: {
      fontFamily: "Poppins-Bold",
      fontWeight: "bold",
      fontSize: 30,
      color: "textColor",
    },
    h5: {
      fontFamily: "Poppins-Bold",
      fontWeight: "bold",
      fontSize: 26,
      color: "textColor",
    },
    h6: {
      fontFamily: "Poppins-Bold",
      fontWeight: "bold",
      fontSize: 22,
      color: "textColor",
    },
    s1: {
      fontFamily: "Poppins-SemiBold",
      fontWeight: "600",
      fontSize: 22,
      color: "textColor",
    },
    s2: {
      fontFamily: "Poppins-SemiBold",
      fontWeight: "600",
      fontSize: 19,
      color: "textColor",
    },
    p1: {
      fontFamily: "Poppins-Regular",
      fontWeight: "400",
      fontSize: 19,
      color: "textColor",
    },
    p2: {
      fontFamily: "Poppins-Regular",
      fontWeight: "400",
      fontSize: 17,
      color: "textColor",
    },
    c1: {
      fontFamily: "Poppins-Regular",
      fontWeight: "400",
      fontSize: 17,
      color: "textColor",
    },
    c2: {
      fontFamily: "Poppins-Medium",
      fontWeight: "500",
      fontSize: 17,
      color: "textColor",
    },
    label: {
      fontFamily: "Poppins-Bold",
      fontWeight: "bold",
      fontSize: 17,
      color: "textColor",
    },
    button: {
      fontFamily: "Poppins-Medium",
      fontWeight: "500",
      fontSize: 17,
      color: "buttonTextColor",
    },
    notifications: {
      fontFamily: "Poppins-Medium",
      fontWeight: "500",
      fontSize: 17,
      color: "buttonTextColor",
    },
  },
  components: {
    ActivityIndicator: {
      baseStyle: {
        color: "primary500",
      },
      sizes: {
        s: {
          size: 10,
        },
        m: {
          size: 30,
        },
        l: {
          size: 50,
        },
        xl: {
          size: 70,
        },
      },
      variants: {
        ball: {},
        bar: {},
        dot: {
          sizeMultiplier: 0.2,
        },
        spinner: {},
        pacman: {},
        pulse: {},
        skype: {},
        activity: {},
        wave: {},
      },
      defaults: {
        size: "m",
        variant: "spinner",
      },
    },
  },
});

export const baseDarkTheme = {
  ...baseLightTheme,
  colors: {
    ...baseLightTheme.colors,
    mainBackground: palette.neutral700,
    textColor: palette.neutral100,
  },
};
