import { MolecularComponentConfig, StateProps } from "../../../theme/src/types";
import { BoxProps } from "../../atoms/box/box";
import { IconProps } from "../../atoms/icon/icon";
import { TextProps } from "../../atoms/text/text";
import { InputProps } from "./input";

export type InputAtoms = {
  container: BoxProps & StateProps<"_focused" | "_disabled" | "_invalid">;
  input: InputProps;
  text: TextProps;
  icon: IconProps;
};

const InputConfig: MolecularComponentConfig<InputAtoms> = {
  parts: ["container", "input", "text", "icon"],
  baseStyle: {
    container: {
      flexDirection: "row",
      alignSelf: "flex-start",
      _invalid: {
        borderWidth: 1,
        borderColor: "danger.500",
      },
      _disabled: {
        opacity: 0.5,
      },
      transition: {
        duration: 100,
      },
    },
    text: {
      color: {
        light: "neutral.900",
        dark: "neutral.50",
      },
      fontFamily: "body",
      fontWeight: "normal",
    },
    icon: {
      alignSelf: "center",
      color: {
        light: "neutral.500",
        dark: "neutral.600",
      },
    },
    input: {
      placeholderTextColor: {
        light: "neutral.500",
        dark: "neutral.600",
      },
      selectionColor: "primary.500",
      allowFontScaling: true,
    },
  },
  sizes: {
    xs: {
      container: {
        py: "1",
        px: "1",
        borderRadius: "s",
      },
      input: { mx: "1" },
      text: {
        fontSize: "xs",
        lineHeight: "m",
      },
      icon: {
        rawSize: 9,
        mx: "0.5",
      },
    },
    s: {
      container: {
        py: "1.5",
        px: "1",
        borderRadius: "s",
      },
      input: { mx: "1" },
      text: {
        fontSize: "xs",
        lineHeight: "m",
      },
      icon: { rawSize: 11, mx: "1" },
    },
    m: {
      container: {
        py: "2",
        px: "1.5",
        borderRadius: "m",
      },
      input: { mx: "1" },
      text: {
        fontSize: "s",
        lineHeight: "xl",
      },
      icon: {
        rawSize: 13,
        mx: "1.5",
      },
    },
    l: {
      container: {
        py: "3",
        px: "2.5",
        borderRadius: "m",
      },
      input: { mx: "1.5" },
      text: {
        fontSize: "m",
        lineHeight: "2xl",
      },
      icon: {
        rawSize: 15,
        mx: "1.5",
      },
    },
  },
  variants: {
    filled: {
      container: {
        animate: {
          borderWidth: 1,
          backgroundColor: {
            light: "neutral.200",
            dark: "neutral.800",
          },
          borderColor: {
            light: "neutral.300",
            dark: "neutral.700",
          },
        },
        _focused: {
          borderColor: "primary.500",
          backgroundColor: {
            light: "white",
            dark: "neutral.900",
          },
        },
      },
    },
    outline: {
      container: {
        animate: {
          borderWidth: 1,
          backgroundColor: {
            light: "neutral.50",
            dark: "neutral.800",
          },
          borderColor: {
            light: "neutral.400",
            dark: "neutral.500",
          },
        },
        _focused: {
          borderColor: "primary.500",
        },
      },
      input: {
        placeholderTextColor: {
          light: "neutral.500",
          dark: "neutral.600",
        },
      },
      icon: {
        color: {
          light: "neutral.500",
          dark: "neutral.500",
        },
      },
    },
  },
  defaults: {
    size: "m",
    variant: "filled",
  },
};

export default InputConfig;
