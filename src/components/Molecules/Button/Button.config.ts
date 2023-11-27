export default {
  parts: ["box", "text", "spinner", "icon"],
  baseStyle: {
    box: {
      my: "1",
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
        py: "1",
        px: "1.5",
        borderRadius: "s",
      },
      text: {
        variant: "p4",
      },
      spinner: {
        my: "1",
        size: "s",
      },
      icon: {
        size: "s",
      },
    },
    s: {
      box: {
        py: "1.5",
        px: "1.5",
        borderRadius: "s",
      },
      text: {
        variant: "p3",
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
        py: "2",
        px: "2",
        borderRadius: "m",
      },
      text: {
        variant: "p2",
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
        py: "2.5",
        px: "2.5",
        borderRadius: "m",
      },
      text: {
        variant: "p1",
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
