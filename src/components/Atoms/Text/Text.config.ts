export default {
  baseStyle: {
    color: {
      light: "neutral.900",
      dark: "neutral.50",
    },
    scaleFontSize: true,
    letterSpacing: "m",
  },
  variants: {
    h1: {
      fontFamily: "heading",
      fontWeight: "bold",
      fontSize: "8xl",
      lineHeight: "12xl",
    },
    h2: {
      fontFamily: "heading",
      fontWeight: "bold",
      fontSize: "5xl",
      lineHeight: "8xl",
    },
    h3: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "2xl",
      lineHeight: "7xl",
    },
    h4: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "l",
      lineHeight: "3xl",
    },
    h5: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "m",
      lineHeight: "2xl",
    },
    h6: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "s",
      lineHeight: "l",
    },
    p1: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "l",
      lineHeight: "2xl",
    },
    p2: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "m",
      lineHeight: "xl",
    },
    p3: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "s",
      lineHeight: "l",
    },
    p4: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "xs",
      lineHeight: "l",
    },
  },
  defaults: {
    variant: "p2",
  },
};
