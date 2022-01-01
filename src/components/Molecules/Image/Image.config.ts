export default {
  parts: ["root", "spinner"],
  baseStyle: {
    root: {
      loaderType: "spinner",
      backgroundColor: "neutral.100",
      isCached: true,
      borderRadius: "l",
      transitionDuration: 300,
      tint: "dark",
    },
    spinner: {
      color: "neutral.400",
    },
  },
};
