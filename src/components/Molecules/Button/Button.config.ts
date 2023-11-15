export default {
  parts: ["box", "text", "spinner", "icon"],
  baseStyle: {
    box: {
      my: "2xs",
      justifyContent: "center",
      alignItems: "center",
      _pressed: {
        opacity: 0.8,
      },
    },
    icon: {
      alignSelf: "center",
    },
  },
  sizes: {
    xs: {
      box: {
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
      box: {
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
      box: {
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
      box: {
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
      box: {
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
      box: {
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
      box: {
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
