import { MolecularComponentConfig } from "../../../theme/src/types";
import { BoxProps } from "../../atoms/box/box";
import { BaseProgressProps } from "./progress";

export type ProgressAtoms = {
  container: BaseProgressProps;
  bar: BoxProps;
};

const ProgressConfig: MolecularComponentConfig<ProgressAtoms> = {
  parts: ["container", "bar"],
  baseStyle: {
    container: {
      my: "1",
      overflow: "hidden",
    },
    bar: {
      w: "100%",
      h: "100%",
      transition: {
        type: "spring",
        dampingRatio: 1,
        duration: 200,
      },
    },
  },
  sizes: {
    xs: {
      container: (variant) => {
        const baseStyle = {
          height: 5,
          borderRadius: "s",
        };

        if (variant === "outline")
          return {
            ...baseStyle,
            p: "0.25",
          };

        return baseStyle;
      },
      bar: {
        borderTopLeftRadius: "s",
        borderBottomLeftRadius: "s",
      },
    },
    s: {
      container: (variant) => {
        const baseStyle = {
          height: 8,
          borderRadius: "m",
        };

        if (variant === "outline")
          return {
            ...baseStyle,
            p: "0.5",
          };

        return baseStyle;
      },
      bar: {
        borderTopLeftRadius: "m",
        borderBottomLeftRadius: "m",
      },
    },
    m: {
      container: (variant) => {
        const baseStyle = {
          height: 12,
          borderRadius: "m",
        };

        if (variant === "outline")
          return {
            ...baseStyle,
            p: "0.75",
          };

        return baseStyle;
      },
      bar: {
        borderTopLeftRadius: "m",
        borderBottomLeftRadius: "m",
      },
    },
    l: {
      container: (variant) => {
        const baseStyle = {
          height: 15,
          borderRadius: "m",
        };

        if (variant === "outline")
          return {
            ...baseStyle,
            p: "1",
          };

        return baseStyle;
      },
      bar: {
        borderTopLeftRadius: "m",
        borderBottomLeftRadius: "m",
      },
    },
  },
  variants: {
    filled: {
      container: {
        backgroundColor: "neutral.200",
      },
      bar: {
        bgColor: "primary.500",
      },
    },
    outline: {
      container: {
        borderWidth: 1,
        borderColor: "primary.500",
        backgroundColor: "transparent",
      },
      bar: {
        bgColor: "primary.500",
      },
    },
  },
  defaults: {
    size: "m",
    variant: "filled",
  },
};

export default ProgressConfig;
