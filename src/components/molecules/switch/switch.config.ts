import { Easing } from "react-native-reanimated";

export default {
  parts: ["track", "knob"],
  baseStyle: {
    track: {
      my: "1",
      p: "0.5",
      borderRadius: "full",
      bgColor: "neutral.300",
      animate: {},
      transition: {
        type: "spring",
        dampingRatio: 1,
        duration: 50,
        easing: Easing.inOut,
      },
      _checked: {
        bgColor: "primary.500",
      },
      _disabled: {
        opacity: 0.5,
      },
    },
    knob: {
      h: "100%",
      aspectRatio: 1,
      bgColor: "neutral.50",
      borderRadius: "full",
      animate: {
        translateX: 0,
      },
      transition: {
        type: "spring",
        dampingRatio: 1,
        duration: 50,
        easing: Easing.inOut,
      },
    },
  },
  sizes: {
    xs: {
      track: {
        w: 24,
        h: 15,
      },
      knob: {
        _checked: {
          translateX: 9,
        },
      },
    },
    s: {
      track: {
        w: 33,
        h: 20,
      },
      knob: {
        _checked: {
          translateX: 13,
        },
      },
    },
    m: {
      track: {
        w: 42,
        h: 25,
      },
      knob: {
        _checked: {
          translateX: 17,
        },
      },
    },
    l: {
      track: {
        w: 51,
        h: 30,
      },
      knob: {
        _checked: {
          translateX: 21,
        },
      },
    },
  },
  defaults: {
    size: "m",
  },
};
