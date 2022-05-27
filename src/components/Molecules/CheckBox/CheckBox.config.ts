export default {
  parts: ["root", "box", "icon", "text"],
  baseStyle: {
    root: {
      my: "2xs",
      spacing: "xs",
    },
    box: {
      p: "hairline",
      shape: "square",
      borderColor: "neutral.300",
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
        variant: "p2",
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
        variant: "p2",
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
        variant: "p1",
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
        borderWidth: 2,
        backgroundColor: {
          light: "neutral.200",
          dark: "neutral.900",
        },
        borderColor: {
          light: "neutral.200",
          dark: "neutral.600",
        },
        _checked: {
          bg: "primary.500",
          borderColor: "primary.500",
        },
      },
    },
    outline: {
      box: {
        borderWidth: 2,
        backgroundColor: {
          light: "neutral.50",
          dark: "neutral.800",
        },
        borderColor: {
          light: "neutral.400",
          dark: "neutral.500",
        },
        _checked: {
          bg: "primary.500",
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
