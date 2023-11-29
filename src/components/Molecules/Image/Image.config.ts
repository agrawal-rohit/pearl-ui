export default {
  parts: ["container", "image", "previewImage", "fallbackImage", "spinner"],
  baseStyle: {
    container: {
      backgroundColor: "neutral.100",
      borderRadius: "l",
    },
    image: {
      loaderType: "spinner",
      isCached: true,
      overlayTransitionDuration: 300,
      tint: "dark",
    },
    spinner: {
      color: "neutral.400",
    },
  },
};
