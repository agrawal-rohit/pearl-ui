import { MolecularComponentConfig, StateProps } from "../../../theme/src/types";
import { BoxProps } from "../../atoms/box/box";
import { PressableProps } from "../../atoms/pressable/pressable";
import { TextProps } from "../../atoms/text/text";
import { RadioProps } from "./radio";

export type RadioAtoms = {
  container: Omit<PressableProps, keyof RadioProps> & RadioProps;
  outerBox: BoxProps & StateProps<"_checked" | "_invalid">;
  innerBox: BoxProps & StateProps<"_checked">;
  text: TextProps;
};

const RadioConfig: MolecularComponentConfig<RadioAtoms> = {
  parts: ["container", "outerBox", "innerBox", "text"],
  baseStyle: {
    container: {
      my: "1",
      spacing: "2.5",
      _disabled: {
        opacity: 0.5,
      },
    },
    outerBox: {
      p: "0.5",
      borderWidth: 2,
      borderRadius: "full",
      alignSelf: "center",
      borderColor: "neutral.300",
      _invalid: {
        borderColor: "danger.500",
      },
      transition: {
        type: "timing",
        duration: 50,
      },
    },
    innerBox: {
      w: "100%",
      h: "100%",
      borderRadius: "full",
      transition: {
        type: "timing",
        duration: 50,
      },
    },
    text: {
      alignSelf: "center",
    },
  },
  sizes: {
    xs: {
      outerBox: {
        p: 0.5,
        w: 17,
        h: 17,
      },
      text: {
        variant: "p4",
      },
    },
    s: {
      outerBox: {
        p: 1,
        w: 21,
        h: 21,
      },
      text: {
        variant: "p3",
      },
    },
    m: {
      outerBox: {
        p: 1,
        w: 25,
        h: 25,
      },
      text: {
        variant: "p3",
      },
    },
    l: {
      outerBox: {
        p: 1.5,
        w: 29,
        h: 29,
      },
      text: {
        variant: "p2",
      },
    },
  },
  variants: {
    filled: {
      outerBox: {
        animate: {
          backgroundColor: {
            light: "neutral.200",
            dark: "neutral.900",
          },
        },
        borderColor: {
          light: "neutral.300",
          dark: "neutral.600",
        },
        _checked: {
          bgColor: "primary.500",
          borderColor: "primary.500",
        },
      },
      innerBox: {
        animate: {
          backgroundColor: {
            light: "neutral.200",
            dark: "neutral.900",
          },
        },
        _checked: {
          backgroundColor: {
            light: "neutral.50",
            dark: "neutral.900",
          },
        },
      },
    },
    outline: {
      outerBox: {
        backgroundColor: "transparent",
        animate: {
          borderColor: {
            light: "neutral.400",
            dark: "neutral.500",
          },
        },
        _checked: {
          borderColor: "primary.500",
        },
      },
      innerBox: {
        animate: {
          backgroundColor: {
            light: "neutral.50",
            dark: "neutral.800",
          },
        },
        _checked: {
          backgroundColor: "primary.500",
        },
      },
    },
  },
  defaults: {
    size: "m",
    variant: "filled",
  },
};

export default RadioConfig;
