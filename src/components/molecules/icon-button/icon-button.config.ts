import { MolecularComponentConfig } from "../../../theme/src/types";
import { IconProps } from "../../atoms/icon/icon";
import { SpinnerProps } from "../../atoms/spinner/spinner";
import { IconButtonProps } from "./icon-button";

export type IconButtonAtoms = {
  pressable: IconButtonProps;
  spinner: SpinnerProps;
  icon: IconProps;
};

const IconButtonConfig: MolecularComponentConfig<IconButtonAtoms> = {
  parts: ["pressable", "spinner", "icon"],
  baseStyle: {
    pressable: {
      my: "1",
      justifyContent: "center",
      alignItems: "center",
      _disabled: {
        opacity: 0.5,
      },
      transition: {
        duration: 100,
      },
    },
    icon: {
      alignSelf: "center",
    },
  },
  sizes: {
    xs: {
      pressable: {
        p: "1.5",
        borderRadius: "s",
      },
      spinner: {
        my: "1",
        size: "xs",
      },
      icon: {
        rawSize: 9,
      },
    },
    s: {
      pressable: {
        p: "2",
        borderRadius: "m",
      },
      spinner: {
        size: "s",
      },
      icon: {
        rawSize: 11,
      },
    },
    m: {
      pressable: {
        p: "3",
        borderRadius: "m",
      },
      spinner: {
        size: "s",
      },
      icon: {
        rawSize: 13,
      },
    },
    l: {
      pressable: {
        p: "4",
        borderRadius: "m",
      },
      spinner: {
        size: "m",
      },
      icon: {
        rawSize: 15,
      },
    },
  },
  variants: {
    filled: {
      pressable: {
        borderWidth: 1,
        borderColor: "primary.500",
        backgroundColor: "primary.500",
        _pressed: {
          bgColor: "primary.400",
        },
      },
      spinner: {
        color: "neutral.50",
      },
      icon: {
        color: "neutral.50",
      },
    },
    outline: {
      pressable: {
        backgroundColor: {
          light: "neutral.50",
          dark: "neutral.800",
        },
        borderWidth: 1,
        borderColor: "primary.500",
        _pressed: {
          bgColor: {
            light: "primary.50",
            dark: "primary.900",
          },
        },
      },
      spinner: {
        color: "primary.500",
      },
      icon: {
        color: "primary.500",
      },
    },
    ghost: {
      pressable: {
        backgroundColor: "transparent",
        _pressed: {
          bgColor: {
            light: "primary.50",
            dark: "primary.900",
          },
        },
      },
      spinner: {
        color: "primary.500",
      },
      icon: {
        color: "primary.500",
      },
    },
  },
  defaults: {
    size: "m",
    variant: "filled",
  },
};

export default IconButtonConfig;
