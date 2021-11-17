export default {
  parts: ["root", "text"],
  baseStyle: {
    root: {
      borderRadius: "full",
    },
    text: {
      color: "neutral.50",
    },
  },
  sizes: {
    s: {
      root: {
        w: 20,
        h: 20,
      },
      text: {
        variant: "btn4",
      },
    },
    m: {
      root: {
        w: 25,
        h: 25,
      },
      text: {
        variant: "btn4",
      },
    },
    l: {
      root: {
        w: 30,
        h: 30,
      },
      text: {
        variant: "btn3",
      },
    },
    xl: {
      root: {
        w: 35,
        h: 35,
      },
      text: {
        variant: "btn3",
      },
    },
  },
  variants: {
    primary: {
      root: {
        backgroundColor: "primary.500",
      },
    },
    success: {
      root: {
        backgroundColor: "success.500",
      },
    },
    warning: {
      root: {
        backgroundColor: "warning.500",
      },
    },
    info: {
      root: {
        backgroundColor: "info.500",
      },
    },
    error: {
      root: {
        backgroundColor: "danger.500",
      },
    },
  },
  defaults: {
    size: "m",
    variant: "primary",
  },
};
