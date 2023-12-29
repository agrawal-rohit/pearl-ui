import { MolecularComponentConfig } from "../../../theme";
import { TextProps } from "../../atoms/text/text";
import { SpinnerProps } from "../../atoms/spinner/spinner";
import { IconProps } from "../../atoms/icon/icon";
import { ButtonProps } from "./button";

export type ButtonAtoms = {
  pressable: ButtonProps;
  text: TextProps;
  spinner: SpinnerProps;
  icon: IconProps;
};

const ButtonConfig: MolecularComponentConfig<ButtonAtoms> = {
  parts: ["pressable", "text", "spinner", "icon"],
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
    spinner: {
      alignSelf: "center",
    },
    text: {
      fontWeight: "500",
    },
  },
  sizes: {
    xs: {
      pressable: {
        py: "0.5",
        px: "2",
        borderRadius: "s",
      },
      text: {
        fontSize: "2xs",
      },
      spinner: {
        my: "1",
        size: "xs",
      },
      icon: {
        rawSize: 9,
        mx: 1,
      },
    },
    s: {
      pressable: {
        py: "1.5",
        px: "2.5",
        borderRadius: "m",
      },
      text: {
        variant: "p4",
      },
      spinner: {
        size: "s",
      },
      icon: {
        rawSize: 11,
        mx: 1.5,
      },
    },
    m: {
      pressable: {
        py: "2.5",
        px: "3",
        borderRadius: "m",
      },
      text: {
        variant: "p3",
      },
      spinner: {
        size: "s",
      },
      icon: {
        rawSize: 13,
        mx: 1.5,
      },
    },
    l: {
      pressable: {
        py: "3",
        px: "4",
        borderRadius: "m",
      },
      text: {
        variant: "p2",
      },
      spinner: {
        size: "m",
      },
      icon: {
        rawSize: 15,
        mx: 2,
      },
    },
  },
  variants: {
    filled: {
      pressable: {
        borderWidth: 1,
        borderColor: "primary.500",
        backgroundColor: "primary.500",
        _hovered: {
          bgColor: "primary.400",
        },
        _pressed: {
          bgColor: "primary.400",
        },
      },
      text: { color: "neutral.50" },
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
        _hovered: {
          bgColor: {
            light: "primary.50",
            dark: "primary.900",
          },
        },
        _pressed: {
          bgColor: {
            light: "primary.50",
            dark: "primary.900",
          },
        },
      },
      text: { color: "primary.500" },
      spinner: {
        color: "primary.500",
      },
      icon: {
        color: "primary.500",
      },
    },
    ghost: {
      pressable: {
        bgColor: {
          light: "primary.50(transparent)",
          dark: "primary.900(transparent)",
        },
        _hovered: {
          bgColor: {
            light: "primary.50",
            dark: "primary.900",
          },
        },
        _pressed: {
          bgColor: {
            light: "primary.50",
            dark: "primary.900",
          },
        },
      },
      text: { color: "primary.500" },
      spinner: {
        color: "primary.500",
      },
      icon: {
        color: "primary.500",
      },
    },
    link: {
      pressable: {
        px: "0",
        py: "0",
        backgroundColor: "transparent",
        _hovered: { opacity: 0.85 },
        _pressed: { opacity: 0.7 },
      },
      text: { color: "primary.500", textDecorationLine: "underline" },
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

export default ButtonConfig;
