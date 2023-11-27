export default {
  parts: ["container", "box", "icon", "text"],
  baseStyle: {
    container: {
      my: "1",
      spacing: "2.5",
      _disabled: {
        opacity: 0.5,
      },
    },
    box: {
      p: "0.5",
      shape: "square",
      borderWidth: 2,
      borderColor: "neutral.300",
      transition: {
        duration: 100,
      },
      _invalid: {
        borderColor: "danger.500",
      },
    },
    icon: {
      checkedIconFamily: "Ionicons",
      checkedIconName: "checkmark",
      indeterminateIconFamily: "Ionicons",
      indeterminateIconName: "remove-outline",
      color: "neutral.50",
    },
  },
  sizes: {
    s: {
      box: {
        borderRadius: "s",
      },
      icon: {
        size: "s",
      },
      text: {
        variant: "p4",
      },
    },
    m: {
      box: {
        borderRadius: "s",
      },
      icon: {
        size: "m",
      },
      text: {
        variant: "p3",
      },
    },
    l: {
      box: {
        borderRadius: "m",
      },
      icon: {
        size: "l",
      },
      text: {
        variant: "p2",
      },
    },
    xl: {
      box: {
        borderRadius: "m",
      },
      icon: {
        size: "xl",
      },
      text: {
        variant: "p1",
      },
    },
  },
  variants: {
    filled: {
      box: {
        animate: {
          backgroundColor: {
            light: "neutral.200",
            dark: "neutral.900",
          },
          borderColor: {
            light: "neutral.200",
            dark: "neutral.600",
          },
        },
        _checked: {
          bgColor: "primary.500",
          borderColor: "primary.500",
        },
      },
    },
    outline: {
      box: {
        borderWidth: 2,
        animate: {
          backgroundColor: {
            light: "neutral.50",
            dark: "neutral.800",
          },
          borderColor: {
            light: "neutral.400",
            dark: "neutral.500",
          },
        },
        _checked: {
          bgColor: "primary.500",
          borderColor: "primary.500",
        },
      },
    },
  },
  defaults: {
    size: "m",
    variant: "filled",
  },
};
