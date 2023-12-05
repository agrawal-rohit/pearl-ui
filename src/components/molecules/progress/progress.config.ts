import { Easing } from "react-native-reanimated";

export default {
  parts: ["container", "bar"],
  baseStyle: {
    container: {
      my: "1",
      overflow: "hidden",
    },
    bar: {
      w: "100%",
      h: "100%",
      transition: {
        type: "spring",
        dampingRatio: 1,
        duration: 200,
        easing: Easing.inOut,
      },
    },
  },
  sizes: {
    xs: {
      container: (variant: string) => {
        const baseStyle = {
          height: 10,
          borderRadius: "s",
        };

        if (variant === "outline")
          return {
            ...baseStyle,
            p: "0.5",
          };

        return baseStyle;
      },
      bar: {
        borderTopLeftRadius: "s",
        borderBottomLeftRadius: "s",
      },
    },
    s: {
      container: (variant: string) => {
        const baseStyle = {
          height: 15,
          borderRadius: "m",
        };

        if (variant === "outline")
          return {
            ...baseStyle,
            p: "0.5",
          };

        return baseStyle;
      },
      bar: {
        borderTopLeftRadius: "m",
        borderBottomLeftRadius: "m",
      },
    },
    m: {
      container: (variant: string) => {
        const baseStyle = {
          height: 20,
          borderRadius: "m",
        };

        if (variant === "outline")
          return {
            ...baseStyle,
            p: "1",
          };

        return baseStyle;
      },
      bar: {
        borderTopLeftRadius: "m",
        borderBottomLeftRadius: "m",
      },
    },
    l: {
      container: (variant: string) => {
        const baseStyle = {
          height: 25,
          borderRadius: "m",
        };

        if (variant === "outline")
          return {
            ...baseStyle,
            p: "1",
          };

        return baseStyle;
      },
      bar: {
        borderTopLeftRadius: "m",
        borderBottomLeftRadius: "m",
      },
    },
  },
  variants: {
    filled: {
      container: {
        backgroundColor: "neutral.200",
      },
      bar: {
        bgColor: "primary.500",
      },
    },
    outline: {
      container: {
        borderWidth: 1,
        borderColor: "primary.500",
        backgroundColor: "transparent",
      },
      bar: {
        bgColor: "primary.500",
      },
    },
  },
  defaults: {
    size: "m",
    variant: "filled",
  },
};
