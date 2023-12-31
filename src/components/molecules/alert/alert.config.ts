import { MolecularComponentConfig } from "../../../theme/src/types";
import { IconProps } from "../../atoms/icon/icon";
import { StackProps } from "../../atoms/stack/stack";
import { TextProps } from "../../atoms/text/text";
import { IconButtonProps } from "../icon-button/icon-button";
import { BaseAlertProps } from "./alert";

export type AlertAtoms = {
  container: BaseAlertProps;
  stack: StackProps;
  icon: IconProps;
  closeButton: Partial<IconButtonProps>;
  title: TextProps;
  description: TextProps;
};

const AlertConfig: MolecularComponentConfig<AlertAtoms> = {
  parts: ["container", "stack", "icon", "title", "closeButton", "description"],
  baseStyle: {
    container: {
      px: 4,
      py: 3,
      spacing: 4,
      borderRadius: "m",
      direction: "horizontal",
      bgColor: "neutral.200",
      flexWrap: "nowrap",
    },
    stack: {
      flex: 1,
      spacing: "0.5",
    },
    closeButton: {
      size: "xs",
      variant: "ghost",
      p: "0.75",
      atoms: {
        icon: {
          color: {
            light: "neutral.900",
            dark: "neutral.50",
          },
          rawSize: 11,
        },
      },
    },
    icon: { size: "s", alignSelf: "center", iconFamily: "AntDesign" },
    title: {
      fontWeight: "semibold",
    },
    description: {
      fontSize: 13,
    },
  },
  variants: {
    success: {
      container: {
        bgColor: { light: "success.100", dark: "success.800" },
      },
      icon: {
        color: { light: "success.700", dark: "success.400" },
        iconName: "checkcircle",
      },
      title: {
        color: { light: "success.800", dark: "success.300" },
      },
      closeButton: {
        _hovered: {
          bgColor: { light: "success.200", dark: "success.700" },
        },
        _pressed: {
          bgColor: { light: "success.200", dark: "success.700" },
        },
      },
    },
    danger: {
      container: {
        bgColor: { light: "danger.100", dark: "danger.800" },
      },
      icon: {
        color: { light: "danger.700", dark: "danger.400" },
        iconName: "exclamationcircle",
      },
      title: {
        color: { light: "danger.800", dark: "danger.300" },
      },
    },
    warning: {
      container: {
        bgColor: { light: "warning.100", dark: "warning.800" },
      },
      icon: {
        color: { light: "warning.700", dark: "warning.400" },
        iconName: "exclamationcircle",
      },
      title: {
        color: { light: "warning.800", dark: "warning.300" },
      },
    },
    info: {
      container: {
        bgColor: { light: "info.100", dark: "info.800" },
      },
      icon: {
        color: { light: "info.700", dark: "info.400" },
        iconName: "infocirlce",
      },
      title: {
        color: { light: "info.800", dark: "info.300" },
      },
    },
  },
  defaults: {
    variant: "success",
  },
};

export default AlertConfig;
