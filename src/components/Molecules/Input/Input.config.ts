export default {
  parts: ["root", "input", "text", "icon"],
  baseStyle: {
    root: {
      flexDirection: "row",
      alignSelf: "flex-start",
      margin: "xxs",
    },
    text: {
      color: {
        light: "neutral.900",
        dark: "neutral.50",
      },
      fontFamily: "Poppins-Regular",
      fontWeight: "400",
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
        light: "neutral.400",
        dark: "neutral.600",
      },
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
      input: {
        mx: "xxs",
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
        mx: "xxs",
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
        focusBackgroundColor: {
          light: "neutral.50",
          dark: "neutral.800",
        },
        borderWidth: 1,
        borderColor: {
          light: "neutral.200",
          dark: "neutral.900",
        },
        focusBorderColor: "primary.500",
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
        focusBorderColor: "primary.500",
      },
      input: {
        placeholderTextColor: {
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
