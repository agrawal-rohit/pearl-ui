import { AtomicComponentConfig } from "../../../theme/src/types";
import { SpinnerProps } from "./Spinner";

export default {
  baseStyle: {
    color: "primary.500",
    animationDuration: 1200,
    animating: true,
  },
  sizes: {
    s: {
      spinnerSize: 10,
    },
    m: {
      spinnerSize: 15,
    },
    l: {
      spinnerSize: 20,
    },
    xl: {
      spinnerSize: 30,
    },
  },
  variants: {
    ball: { count: 8 },
    bar: { count: 3 },
    dot: {
      sizeMultiplier: 0.2,
      count: 4,
    },
    spinner: {
      animationDuration: 3600,
    },
    pacman: {},
    pulse: {},
    skype: {
      animationDuration: 1600,
      count: 5,
      minScale: 0.2,
      maxScale: 1.0,
    },
    activity: { count: 12 },
    wave: {
      animationDuration: 1600,
      count: 4,
      waveFactor: 0.54,
      waveMode: "fill",
    },
  },
  defaults: {
    size: "m",
    variant: "spinner",
  },
} as AtomicComponentConfig;
