export default {
  parts: ["container", "text"],
  baseStyle: {
    container: {
      activeOpacity: 0.8,
    },
    text: {
      fontWeight: 500,
      color: "primary.500",
    },
  },
  sizes: {
    xs: {
      text: {
        variant: "p4",
      },
    },
    s: {
      text: {
        variant: "p3",
      },
    },
    m: {
      text: {
        variant: "p2",
      },
    },
    l: {
      text: {
        variant: "p1",
      },
    },
  },
  defaults: {
    size: "m",
  },
};
