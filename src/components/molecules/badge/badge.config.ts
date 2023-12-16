import { MolecularComponentConfig } from "../../../theme/src/types";
import { TextProps } from "../../atoms/text/text";
import { BadgeProps } from "./badge";

export type BadgeAtoms = {
  box: BadgeProps;
  text: TextProps;
};

const BadgeConfig: MolecularComponentConfig<BadgeAtoms> = {
  parts: ["box", "text"],
  baseStyle: {
    box: {
      backgroundColor: "primary.500",
    },
    text: {
      color: "neutral.50",
      fontWeight: "500",
    },
  },
  sizes: {
    xs: {
      box: {
        minW: 20,
        h: 20,
      },
      text: {
        px: "1.5",
        variant: "p4",
        fontSize: "2xs",
        lineHeight: "m",
      },
    },
    s: {
      box: {
        minW: 25,
        h: 25,
      },
      text: {
        px: "2",
        variant: "p4",
      },
    },
    m: {
      box: {
        minW: 30,
        h: 30,
      },
      text: {
        px: "2.5",
        variant: "p4",
      },
    },
    l: {
      box: {
        minW: 35,
        h: 35,
      },
      text: {
        px: "3",
        variant: "p3",
      },
    },
  },
  variants: {
    rounded: {
      box: {
        borderRadius: "full",
      },
    },
    square: {
      box: {
        borderRadius: "m",
      },
    },
  },
  defaults: {
    size: "m",
    variant: "rounded",
  },
};

export default BadgeConfig;
