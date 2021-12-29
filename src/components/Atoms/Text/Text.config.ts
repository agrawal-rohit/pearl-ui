export default {
  baseStyle: {
    color: {
      light: "neutral.900",
      dark: "neutral.50",
    },
    scaleFontSize: true,
  },
  variants: {
    h1: {
      fontFamily: "heading",
      fontWeight: "bold",
      fontSize: "8xl",
      lineHeight: "10xl",
    },
    h2: {
      fontFamily: "heading",
      fontWeight: "bold",
      fontSize: "5xl",
      lineHeight: "7xl",
    },
    t1: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "2xl",
      lineHeight: "4xl",
    },
    t2: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "l",
      lineHeight: "2xl",
    },
    st1: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "m",
      lineHeight: "xl",
    },
    st2: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "s",
      lineHeight: "l",
    },
    p1: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "m",
      lineHeight: "xl",
    },
    p2: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "s",
      lineHeight: "l",
    },
    caption: {
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "xs",
      lineHeight: "m",
    },
    btn1: {
      fontFamily: "body",
      fontWeight: "medium",
      fontSize: "m",
      lineHeight: "xl",
    },
    btn2: {
      fontFamily: "body",
      fontWeight: "medium",
      fontSize: "s",
      lineHeight: "m",
    },
    btn3: {
      fontFamily: "body",
      fontWeight: "medium",
      fontSize: "xs",
      lineHeight: "s",
    },
    btn4: {
      fontFamily: "body",
      fontWeight: "medium",
      fontSize: "2xs",
      lineHeight: "xs",
    },
  },
  defaults: {
    variant: "p1",
  },
};
