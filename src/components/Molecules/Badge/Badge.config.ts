export default {
  parts: ["box", "text"],
  baseStyle: {
    box: {
      backgroundColor: "primary.500",
    },
    text: {
      color: "neutral.50",
    },
  },
  sizes: {
    s: {
      box: {
        minW: 20,
        h: 20,
      },
      text: {
        px: "2xs",
        variant: "btn4",
      },
    },
    m: {
      box: {
        minW: 25,
        h: 25,
      },
      text: {
        px: "xs",
        variant: "btn4",
      },
    },
    l: {
      box: {
        minW: 30,
        h: 30,
      },
      text: {
        px: "xs",
        variant: "btn3",
      },
    },
    xl: {
      box: {
        minW: 35,
        h: 35,
      },
      text: {
        px: "s",
        variant: "btn3",
      },
    },
  },
  variants: {
    rounded: {
      box: {
        borderRadius: "full",
      },
    },
    square: {
      box: {
        borderRadius: "m",
      },
    },
  },
  defaults: {
    size: "m",
    variant: "rounded",
  },
};
