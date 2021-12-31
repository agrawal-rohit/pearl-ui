import { MolecularComponentConfig } from "../../../theme/src/types";

export default {
  parts: ["root", "outerBox", "innerBox", "text", "errorText"],
  baseStyle: {
    root: {
      my: "2xs",
      spacing: "xs",
    },
    outerBox: {
      errorBorderColor: "danger.500",
      borderRadius: "full",
    },
    innerBox: {
      borderRadius: "full",
    },
    errorText: {
      variant: "caption",
      color: "danger.500",
      marginBottom: "2xs",
    },
  },
  sizes: {
    s: {
      outerBox: {
        width: 18,
        height: 18,
        style: { padding: 3 },
      },
      text: {
        variant: "p2",
      },
    },
    m: {
      outerBox: {
        width: 24,
        height: 24,
        style: { padding: 5 },
      },
      text: {
        variant: "p2",
      },
    },
    l: {
      outerBox: {
        width: 30,
        height: 30,
        style: { padding: 7 },
      },
      text: {
        variant: "p1",
      },
    },
    xl: {
      outerBox: {
        width: 36,
        height: 36,
        style: { padding: 9 },
      },
      text: {
        variant: "p1",
      },
    },
  },
  variants: {
    filled: {
      outerBox: {
        borderWidth: 2,
        checkedBackgroundColor: "primary.500",
        backgroundColor: {
          light: "neutral.200",
          dark: "neutral.900",
        },
        borderColor: {
          light: "neutral.200",
          dark: "neutral.600",
        },
        checkedBorderColor: "primary.500",
      },
      innerBox: {
        backgroundColor: {
          light: "neutral.200",
          dark: "neutral.900",
        },
        checkedBackgroundColor: "neutral.50",
      },
    },
    outline: {
      outerBox: {
        borderWidth: 2,
        checkedBackgroundColor: {
          light: "neutral.50",
          dark: "neutral.800",
        },
        backgroundColor: {
          light: "neutral.50",
          dark: "neutral.800",
        },
        checkedBorderColor: "primary.500",
        borderColor: {
          light: "neutral.400",
          dark: "neutral.500",
        },
      },
      innerBox: {
        backgroundColor: {
          light: "neutral.50",
          dark: "neutral.800",
        },
        checkedBackgroundColor: "primary.500",
      },
    },
  },
  defaults: {
    size: "m",
    variant: "filled",
  },
} as MolecularComponentConfig;
