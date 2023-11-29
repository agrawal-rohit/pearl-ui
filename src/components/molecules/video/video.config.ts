export default {
  parts: ["container", "video", "previewImage", "fallbackImage", "spinner"],
  baseStyle: {
    container: {
      backgroundColor: "neutral.100",
      borderRadius: "l",
    },
    video: {
      loaderType: "spinner",
      overlayTransitionDuration: 300,
      tint: "dark",
    },
    spinner: {
      color: "neutral.400",
    },
  },
};
