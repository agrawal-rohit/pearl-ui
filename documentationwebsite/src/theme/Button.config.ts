export default {
  // The styles all button have in common
  baseStyle: {
    fontWeight: "medium",
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
    lg: {
      fontSize: "lg",
      px: 6, // <-- these values are tokens from the design system
      py: 7, // <-- these values are tokens from the design system
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "lg",
  },
};
