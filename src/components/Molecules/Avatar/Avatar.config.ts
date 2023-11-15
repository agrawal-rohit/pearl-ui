export default {
  parts: ["box", "text"],
  baseStyle: {
    box: {
      borderRadius: "full",
      borderWidth: 2,
      borderColor: {
        light: "neutral.50",
        dark: "neutral.800",
      },
    },
  },
  sizes: {
    s: {
      box: {
        width: 40,
        height: 40,
      },
      text: {
        variant: "caption",
      },
    },
    m: {
      box: {
        width: 55,
        height: 55,
      },
      text: {
        variant: "p1",
        fontSize: "m",
        lineHeight: "3xl",
      },
    },
    l: {
      box: {
        width: 70,
        height: 70,
      },
      text: {
        variant: "p1",
        fontSize: "m",
        lineHeight: "3xl",
      },
    },
    xl: {
      box: {
        width: 85,
        height: 85,
      },
      text: {
        variant: "p1",
        fontSize: "4xl",
        lineHeight: "8xl",
      },
    },
  },
  defaults: {
    size: "m",
  },
};
