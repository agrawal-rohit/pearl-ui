import { BaseSwitchProps } from "./switch";
import { BoxProps } from "../../atoms/box/box";
import { MolecularComponentConfig, StateProps } from "../../../theme/src/types";

export type SwitchAtoms = {
  track: BaseSwitchProps;
  knob: BoxProps & StateProps<"_checked">;
};

const SwitchConfig: MolecularComponentConfig<SwitchAtoms> = {
  parts: ["track", "knob"],
  baseStyle: {
    track: {
      my: "1",
      p: "0.5",
      borderWidth: 1,
      borderRadius: "full",
      borderColor: { light: "neutral.300", dark: "neutral.700" },
      bgColor: { light: "neutral.300", dark: "neutral.800" },
      transition: {
        type: "spring",
        dampingRatio: 1,
        duration: 50,
      },
      _checked: {
        bgColor: "primary.500",
        borderColor: "primary.500",
      },
      _disabled: {
        opacity: 0.5,
      },
    },
    knob: {
      bgColor: "neutral.50",
      borderRadius: "full",
      animate: {
        translateX: 0,
      },
      transition: {
        type: "spring",
        dampingRatio: 1,
        duration: 50,
      },
    },
  },
  sizes: {
    xs: {
      track: {
        w: 24,
        h: 15,
      },
      knob: {
        w: 9,
        h: 9,
        _checked: {
          translateX: 9,
        },
      },
    },
    s: {
      track: {
        w: 33,
        h: 20,
      },
      knob: {
        w: 14,
        h: 14,
        _checked: {
          translateX: 13,
        },
      },
    },
    m: {
      track: {
        w: 42,
        h: 25,
      },
      knob: {
        w: 19,
        h: 19,
        _checked: {
          translateX: 17,
        },
      },
    },
    l: {
      track: {
        w: 51,
        h: 30,
      },
      knob: {
        w: 24,
        h: 24,
        _checked: {
          translateX: 21,
        },
      },
    },
  },
  defaults: {
    size: "m",
  },
};

export default SwitchConfig;
