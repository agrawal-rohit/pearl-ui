export default {
  baseStyle: {
    color: "primary.500",
    animationDuration: 1200,
    animating: true,
  },
  sizes: {
    s: {
      size: 10,
    },
    m: {
      size: 15,
    },
    l: {
      size: 20,
    },
    xl: {
      size: 30,
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
    skype: { count: 5, minScale: 0.2, maxScale: 1.0 },
    activity: { count: 12 },
    wave: { count: 4, waveFactor: 0.54, waveMode: "fill" },
  },
  defaults: {
    size: "m",
    variant: "spinner",
  },
};
