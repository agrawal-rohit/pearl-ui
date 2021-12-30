import { AtomicComponentConfig } from "../../../theme/src/types";
import { TextProps } from "./Text";

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
      lineHeight: "12xl",
    },
    h2: {
      fontFamily: "heading",
      fontWeight: "bold",
      fontSize: "5xl",
      lineHeight: "8xl",
    },
    t1: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "2xl",
      lineHeight: "6xl",
    },
    t2: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "l",
      lineHeight: "3xl",
    },
    st1: {
      fontFamily: "heading",
      fontWeight: "semibold",
      fontSize: "m",
      lineHeight: "2xl",
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
      lineHeight: "2xl",
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
      lineHeight: "2xl",
    },
    btn2: {
      fontFamily: "body",
      fontWeight: "medium",
      fontSize: "s",
      lineHeight: "l",
    },
    btn3: {
      fontFamily: "body",
      fontWeight: "medium",
      fontSize: "xs",
      lineHeight: "m",
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
} as AtomicComponentConfig<TextProps>;
