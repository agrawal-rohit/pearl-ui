import { MolecularComponentConfig, StateProps } from "../../../theme/src/types";
import { BoxProps } from "../../atoms/box/box";
import { IconProps } from "../../atoms/icon/icon";
import { PressableProps } from "../../atoms/pressable/pressable";
import { StackProps } from "../../atoms/stack/stack";
import { TextProps } from "../../atoms/text/text";
import { CheckBoxProps } from "./checkbox";

export type CheckboxAtoms = {
  container: PressableProps & StackProps;
  box: Omit<BoxProps, keyof CheckBoxProps> & CheckBoxProps;
  icon: IconProps & StateProps<"_checked", Partial<IconProps>>;
  text: TextProps;
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
      borderWidth: 2,
      shape: "square",
      alignSelf: "center",
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
    icon: {
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
      box: {
        p: "0.25",
        borderRadius: "s",
      },
      icon: { rawSize: 9 },
      text: {
        variant: "p4",
      },
    },
    s: {
      box: { p: "0.5", borderRadius: "s" },
      icon: { rawSize: 11 },
      text: {
        variant: "p3",
      },
    },
    m: {
      box: {
        p: "0.75",
        borderRadius: "m",
      },
      icon: { rawSize: 13 },
      text: {
        variant: "p3",
      },
    },
    l: {
      box: {
        p: "1",
        borderRadius: "m",
      },
      icon: { rawSize: 15 },
      text: {
        variant: "p2",
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
        opacity: 0,
        _checked: {
          opacity: 1,
          color: "neutral.50",
        },
      },
    },
    outline: {
      box: {
        backgroundColor: "transparent",
        borderColor: {
          light: "neutral.400",
          dark: "neutral.500",
        },
        _checked: {
          borderColor: "primary.500",
        },
      },
      icon: {
        opacity: 0,
        _checked: {
          opacity: 1,
          color: "primary.500",
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
