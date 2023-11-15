export default {
  parts: ["image", "spinner"],
  baseStyle: {
    image: {
      loaderType: "spinner",
      backgroundColor: "neutral.100",
      isCached: true,
      borderRadius: "l",
      transitionDuration: 600,
      tint: "dark",
    },
    spinner: {
      color: "neutral.400",
    },
  },
};
