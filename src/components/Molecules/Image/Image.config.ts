export default {
  parts: ["root", "spinner"],
  baseStyle: {
    root: {
      loaderType: "spinner",
      backgroundColor: "neutral.100",
      borderRadius: "m",
      boxShadow: "2xl",
      cache: true,
      transitionDuration: 300,
      tint: "dark",
    },
    spinner: {
      color: "neutral.400",
    },
  },
  defaults: {},
};
