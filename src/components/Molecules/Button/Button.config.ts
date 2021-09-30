export default {
  parts: ["root", "text", "spinner"],
  baseStyle: {
    root: {
      margin: "s",
    },
  },
  sizes: {
    xs: {
      root: {
        py: "xs",
        px: "s",
        borderRadius: "s",
      },
      text: {
        variant: "btn4",
      },
      spinner: {
        marginVertical: "xs",
        size: "s",
      },
    },
    s: {
      root: {
        py: "s",
        px: "s",
        borderRadius: "s",
      },
      text: {
        variant: "btn3",
      },
      spinner: {
        size: "m",
      },
    },
    m: {
      root: {
        py: "s",
        px: "m",
        borderRadius: "s",
      },
      text: {
        variant: "btn2",
      },
      spinner: {
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
    },
    outline: {
      root: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "primary.500",
      },
      text: { color: "primary.500" },
      spinner: {
        color: "primary.500",
      },
    },
  },
  defaults: {
    size: "m",
    variant: "filled",
  },
};
