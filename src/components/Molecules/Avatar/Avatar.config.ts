import { MolecularComponentConfig } from "./../../../theme/src/types";
export default {
  parts: ["root", "text"],
  baseStyle: {
    root: {
      borderRadius: "full",
    },
  },
  sizes: {
    s: {
      root: {
        width: 40,
        height: 40,
      },
      text: {
        variant: "caption",
      },
    },
    m: {
      root: {
        width: 55,
        height: 55,
      },
      text: {
        variant: "p1",
        fontSize: "m",
        lineHeight: "3xl",
      },
    },
    l: {
      root: {
        width: 70,
        height: 70,
      },
      text: {
        variant: "p1",
        fontSize: "m",
        lineHeight: "3xl",
      },
    },
    xl: {
      root: {
        width: 85,
        height: 85,
      },
      text: {
        variant: "p1",
        fontSize: "4xl",
        lineHeight: "8xl",
      },
    },
  },
  defaults: {
    size: "m",
  },
} as MolecularComponentConfig;
