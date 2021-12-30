import { MolecularComponentConfig } from "../../../theme/src/types";
import { BadgeProps } from "./Badge";

export default {
  parts: ["root", "text"],
  baseStyle: {
    root: {
      backgroundColor: "primary.500",
    },
    text: {
      color: "neutral.50",
    },
  },
  sizes: {
    s: {
      root: {
        minW: 20,
        h: 20,
      },
      text: {
        px: "2xs",
        variant: "btn4",
      },
    },
    m: {
      root: {
        minW: 25,
        h: 25,
      },
      text: {
        px: "xs",
        variant: "btn4",
      },
    },
    l: {
      root: {
        minW: 30,
        h: 30,
      },
      text: {
        px: "xs",
        variant: "btn3",
      },
    },
    xl: {
      root: {
        minW: 35,
        h: 35,
      },
      text: {
        px: "s",
        variant: "btn3",
      },
    },
  },
  variants: {
    rounded: {
      root: {
        borderRadius: "full",
      },
    },
    square: {
      root: {
        borderRadius: "m",
      },
    },
  },
  defaults: {
    size: "m",
    variant: "rounded",
  },
} as MolecularComponentConfig;
