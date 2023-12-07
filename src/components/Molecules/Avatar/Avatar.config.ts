import { MolecularComponentConfig } from "../../../theme";
import { TextProps } from "../../atoms/text/text";
import { AvatarProps } from "./avatar";

export type AvatarAtoms = {
  box: AvatarProps;
  text: TextProps;
};

const AvatarConfig: MolecularComponentConfig<AvatarAtoms> = {
  parts: ["box", "text"],
  baseStyle: {
    box: {
      borderRadius: "full",
      borderWidth: 2,
      borderColor: {
        light: "neutral.50",
        dark: "neutral.800",
      },
    },
  },
  sizes: {
    xs: {
      box: {
        width: 40,
        height: 40,
      },
      text: {
        variant: "p4",
      },
    },
    s: {
      box: {
        width: 55,
        height: 55,
      },
      text: {
        variant: "p2",
        fontSize: "m",
        lineHeight: "3xl",
      },
    },
    m: {
      box: {
        width: 70,
        height: 70,
      },
      text: {
        variant: "p2",
        fontSize: "m",
        lineHeight: "3xl",
      },
    },
    l: {
      box: {
        width: 85,
        height: 85,
      },
      text: {
        variant: "p2",
        fontSize: "4xl",
        lineHeight: "8xl",
      },
    },
  },
  defaults: {
    size: "m",
  },
};

export default AvatarConfig;
