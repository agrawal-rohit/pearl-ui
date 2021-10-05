export default {
  parts: ["root", "text", "spinner", "icon"],
  baseStyle: {
    root: {
      margin: "xxs",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  sizes: {
    xs: {
      root: {
        py: "xxs",
        px: "xs",
        borderRadius: "s",
      },
      text: {
        variant: "btn4",
      },
      spinner: {
        my: "xxs",
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
        size: "m",
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
        size: "l",
      },
    },
  },
  variants: {
    filled: {
      root: {
        backgroundColor: "primary.500",
      },
      text: { color: "neutral.100" },
      spinner: {
        color: "neutral.100",
      },
      icon: {
        color: "neutral.100",
      },
    },
    outline: {
      root: {
        backgroundColor: {
          light: "neutral.100",
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
        backgroundColor: {
          light: "neutral.100",
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
