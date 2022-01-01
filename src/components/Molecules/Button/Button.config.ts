export default {
  parts: ["root", "text", "spinner", "icon"],
  baseStyle: {
    root: {
      my: "2xs",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      alignSelf: "center",
    },
  },
  sizes: {
    xs: {
      root: {
        py: "2xs",
        px: "xs",
        borderRadius: "s",
      },
      text: {
        variant: "btn4",
      },
      spinner: {
        my: "2xs",
        size: "s",
      },
      icon: {
        size: "s",
      },
    },
    s: {
      root: {
        py: "xs",
        px: "xs",
        borderRadius: "s",
      },
      text: {
        variant: "btn3",
      },
      spinner: {
        size: "m",
      },
      icon: {
        size: "s",
      },
    },
    m: {
      root: {
        py: "s",
        px: "s",
        borderRadius: "m",
      },
      text: {
        variant: "btn2",
      },
      spinner: {
        size: "m",
      },
      icon: {
        size: "m",
      },
    },
    l: {
      root: {
        py: "m",
        px: "m",
        borderRadius: "m",
      },
      text: {
        variant: "btn1",
      },
      spinner: {
        size: "l",
      },
      icon: {
        size: "m",
      },
    },
  },
  variants: {
    filled: {
      root: {
        activeBackgroundColor: "primary.400",
        backgroundColor: "primary.500",
      },
      text: { color: "neutral.50" },
      spinner: {
        color: "neutral.50",
      },
      icon: {
        color: "neutral.50",
      },
    },
    outline: {
      root: {
        activeBackgroundColor: {
          light: "primary.50",
          dark: "primary.800",
        },
        backgroundColor: {
          light: "neutral.50",
          dark: "neutral.800",
        },
        borderWidth: 1,
        borderColor: "primary.500",
      },
      text: { color: "primary.500" },
      spinner: {
        color: "primary.500",
      },
      icon: {
        color: "primary.500",
      },
    },
    ghost: {
      root: {
        activeBackgroundColor: {
          light: "primary.50",
          dark: "primary.800",
        },
        backgroundColor: {
          light: "neutral.50",
          dark: "neutral.800",
        },
      },
      text: { color: "primary.500" },
      spinner: {
        color: "primary.500",
      },
      icon: {
        color: "primary.500",
      },
    },
  },
  defaults: {
    size: "m",
    variant: "filled",
  },
};
