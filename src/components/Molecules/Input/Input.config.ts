export default {
  parts: ["root", "input", "text", "icon"],
  baseStyle: {
    root: {
      flexDirection: "row",
      alignSelf: "flex-start",
    },
    text: {
      color: {
        light: "neutral.900",
        dark: "neutral.50",
      },
      fontFamily: "body",
      fontWeight: "normal",
    },
    icon: {
      alignSelf: "center",
      color: {
        light: "neutral.400",
        dark: "neutral.600",
      },
    },
    input: {
      placeholderTextColor: {
        light: "neutral.500",
        dark: "neutral.600",
      },
      selectionColor: "primary.500",
      allowFontScaling: true,
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
      input: {
        mx: "2xs",
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
      input: {
        mx: "2xs",
      },
      text: {
        variant: "btn3",
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
      input: {
        mx: "xs",
      },
      text: {
        variant: "btn2",
      },
      icon: {
        size: "m",
      },
    },
    l: {
      root: {
        py: "m",
        px: "s",
        borderRadius: "m",
      },
      input: {
        mx: "xs",
      },
      text: {
        variant: "btn1",
      },
      icon: {
        size: "m",
      },
    },
  },
  variants: {
    filled: {
      root: {
        backgroundColor: {
          light: "neutral.200",
          dark: "neutral.900",
        },
        borderWidth: 1,
        borderColor: {
          light: "neutral.200",
          dark: "neutral.900",
        },
      },
    },
    outline: {
      root: {
        backgroundColor: {
          light: "neutral.50",
          dark: "neutral.800",
        },
        borderWidth: 1,
        borderColor: {
          light: "neutral.300",
          dark: "neutral.600",
        },
      },
      input: {
        placeholderTextColor: {
          light: "neutral.400",
          dark: "neutral.500",
        },
      },
      icon: {
        color: {
          light: "neutral.400",
          dark: "neutral.500",
        },
      },
    },
  },
  defaults: {
    size: "m",
    variant: "filled",
  },
};
