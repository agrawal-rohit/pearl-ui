import { MolecularComponentConfig } from "../../../theme/src/types";
import { PressableProps } from "../../atoms/pressable/pressable";
import { TextProps } from "../../atoms/text/text";

export type TextLinkAtoms = {
  container: PressableProps;
  text: TextProps;
};

const TextLinkConfig: MolecularComponentConfig<TextLinkAtoms> = {
  parts: ["container", "text"],
  baseStyle: {
    container: {
      _pressed: {
        bgColor: "primary.400",
      },
    },
    text: {
      fontWeight: "500",
      color: "primary.500",
    },
  },
  sizes: {
    xs: {
      text: {
        variant: "p4",
      },
    },
    s: {
      text: {
        variant: "p3",
      },
    },
    m: {
      text: {
        variant: "p2",
      },
    },
    l: {
      text: {
        variant: "p1",
      },
    },
  },
  defaults: {
    size: "m",
  },
};

export default TextLinkConfig;
