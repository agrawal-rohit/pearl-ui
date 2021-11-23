export default {
  parts: ["root", "text"],
  baseStyle: {
    root: {
      borderRadius: "full",
    },
  },
  sizes: {
    s: {
      root: {
        width: 40,
        height: 40,
      },
      text: {
        variant: "caption",
      },
    },
    m: {
      root: {
        width: 55,
        height: 55,
      },
      text: {
        variant: "p1",
        fontSize: 18,
        lineHeight: 26,
      },
    },
    l: {
      root: {
        width: 70,
        height: 70,
      },
      text: {
        variant: "p1",
        fontSize: 18,
        lineHeight: 26,
      },
    },
    xl: {
      root: {
        width: 85,
        height: 85,
      },
      text: {
        variant: "p1",
        fontSize: 28,
        lineHeight: 36,
      },
    },
  },
  defaults: {
    size: "m",
  },
};
