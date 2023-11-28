export default {
  parts: ["box", "text", "spinner", "icon"],
  baseStyle: {
    box: {
      my: "1",
      justifyContent: "center",
      alignItems: "center",
      transition: {
        duration: 100,
      },
    },
    icon: {
      alignSelf: "center",
    },
    text: {
      fontWeight: 500,
    },
  },
  sizes: {
    xs: {
      box: {
        py: "0.5",
        px: "2",
        borderRadius: "s",
      },
      text: {
        fontSize: "2xs",
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
        px: "2.5",
        borderRadius: "m",
      },
      text: {
        variant: "p4",
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
        py: "2.5",
        px: "3",
        borderRadius: "m",
      },
      text: {
        variant: "p3",
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
        py: "3",
        px: "4",
        borderRadius: "m",
      },
      text: {
        variant: "p2",
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
        animate: {
          backgroundColor: "primary.500",
        },
        _pressed: {
          bgColor: "primary.400",
        },
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
        animate: {
          backgroundColor: {
            light: "neutral.50",
            dark: "neutral.800",
          },
          borderWidth: 1,
          borderColor: "primary.500",
        },
        _pressed: {
          bgColor: "primary.50",
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
    ghost: {
      box: {
        animate: {
          backgroundColor: {
            light: "neutral.50",
            dark: "neutral.800",
          },
        },
        _pressed: {
          bgColor: "primary.50",
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
