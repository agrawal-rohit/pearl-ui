export default {
  parts: ["root", "text"],
  baseStyle: {
    root: {
      activeOpacity: 0.8,
    },
    text: {
      color: "primary.500",
    },
  },
  sizes: {
    xs: {
      text: {
        variant: "btn4",
      },
    },
    s: {
      text: {
        variant: "btn3",
      },
    },
    m: {
      text: {
        variant: "btn2",
      },
    },
    l: {
      text: {
        variant: "btn1",
      },
    },
  },
  defaults: {
    size: "m",
  },
};
