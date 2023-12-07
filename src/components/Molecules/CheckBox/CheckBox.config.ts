import { MolecularComponentConfig } from "../../../theme/src/types";
import { BoxProps } from "../../atoms/box/box";
import { IconProps } from "../../atoms/icon/icon";
import { PressableProps } from "../../atoms/pressable/pressable";
import { StackProps } from "../../atoms/stack/stack";
import { TextProps } from "../../atoms/text/text";
import { CheckBoxProps } from "./checkbox";

export type CheckboxAtoms = {
  container: PressableProps & StackProps;
  box: Omit<BoxProps, keyof CheckBoxProps> & CheckBoxProps;
  text: TextProps;
  icon: IconProps;
};

const CheckboxConfig: MolecularComponentConfig<CheckboxAtoms> = {
  parts: ["container", "box", "icon", "text"],
  baseStyle: {
    container: {
      my: "1",
      spacing: "2.5",
      _disabled: {
        opacity: 0.5,
      },
    },
    box: {
      p: "0.5",
      shape: "square",
      borderWidth: 2,
      borderColor: "neutral.300",
      transition: {
        type: "timing",
        duration: 50,
      },
      checkedIconFamily: "Ionicons",
      checkedIconName: "checkmark-sharp",
      indeterminateIconFamily: "Ionicons",
      indeterminateIconName: "remove-outline",
      _invalid: {
        borderColor: "danger.500",
      },
    },
    text: {
      alignSelf: "center",
    },
  },
  sizes: {
    xs: {
      box: {
        borderRadius: "s",
      },
      icon: {
        size: "xs",
      },
      text: {
        variant: "p4",
      },
    },
    s: {
      box: {
        borderRadius: "s",
      },
      icon: {
        size: "s",
      },
      text: {
        variant: "p3",
      },
    },
    m: {
      box: {
        borderRadius: "m",
      },
      icon: {
        size: "m",
      },
      text: {
        variant: "p2",
      },
    },
    l: {
      box: {
        borderRadius: "m",
      },
      icon: {
        size: "l",
      },
      text: {
        variant: "p1",
      },
    },
  },
  variants: {
    filled: {
      box: {
        backgroundColor: {
          light: "neutral.200",
          dark: "neutral.900",
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
      icon: {
        color: {
          light: "neutral.200",
          dark: "neutral.900",
        },
      },
    },
    outline: {
      box: {
        borderWidth: 2,
        backgroundColor: {
          light: "neutral.50",
          dark: "neutral.800",
        },
        borderColor: {
          light: "neutral.400",
          dark: "neutral.500",
        },
        _checked: {
          bgColor: "primary.500",
          borderColor: "primary.500",
        },
      },
      icon: {
        color: {
          light: "neutral.50",
          dark: "neutral.800",
        },
      },
    },
  },
  defaults: {
    size: "m",
    variant: "filled",
  },
};

export default CheckboxConfig;
