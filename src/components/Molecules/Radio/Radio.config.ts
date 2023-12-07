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
      borderColor: "neutral.300",
      _invalid: {
        borderColor: "danger.500",
      },
      transition: {
        duration: 50,
      },
    },
    innerBox: {
      w: "100%",
      h: "100%",
      borderRadius: "full",
      transition: {
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
        w: 18,
        h: 18,
      },
      text: {
        variant: "p3",
      },
    },
    s: {
      outerBox: {
        p: 1,
        w: 24,
        h: 24,
      },
      text: {
        variant: "p3",
      },
    },
    m: {
      outerBox: {
        p: 1.5,
        w: 30,
        h: 30,
      },
      text: {
        variant: "p2",
      },
    },
    l: {
      outerBox: {
        p: 2,
        w: 36,
        h: 36,
      },
      text: {
        variant: "p1",
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
        animate: {
          backgroundColor: {
            light: "neutral.50",
            dark: "neutral.800",
          },
        },
        borderColor: {
          light: "neutral.400",
          dark: "neutral.500",
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
