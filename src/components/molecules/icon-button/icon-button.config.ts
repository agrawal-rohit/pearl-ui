export default {
  parts: ["box", "spinner", "icon"],
  baseStyle: {
    box: {
      my: "1",
      justifyContent: "center",
      alignItems: "center",
      _disabled: {
        opacity: 0.5,
      },
      transition: {
        duration: 100,
      },
    },
    icon: {
      alignSelf: "center",
    },
  },
  sizes: {
    xs: {
      box: {
        p: "1.5",
        borderRadius: "s",
      },
      spinner: {
        my: "1",
        size: "xs",
      },
      icon: {
        size: "xs",
      },
    },
    s: {
      box: {
        p: "2",
        borderRadius: "m",
      },
      spinner: {
        size: "s",
      },
      icon: {
        size: "xs",
      },
    },
    m: {
      box: {
        p: "3",
        borderRadius: "m",
      },
      spinner: {
        size: "s",
      },
      icon: {
        size: "s",
      },
    },
    l: {
      box: {
        p: "4",
        borderRadius: "m",
      },
      spinner: {
        size: "m",
      },
      icon: {
        size: "s",
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
