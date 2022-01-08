import React from "react";
import { View } from "react-native";
import Box, { BoxProps } from "../../Atoms/Box/Box";
import {
  ComponentSizes,
  ComponentVariants,
  ResponsiveValue,
} from "../../../theme/src/types";
import { pearlify } from "../../../hooks/pearlify";

export type DividerProps = BoxProps & {
  /** The size of the divider */
  size?: ResponsiveValue<ComponentSizes<"Divider">>;
  /** The variant of the divider */
  variant?: ResponsiveValue<ComponentVariants<"Divider">>;
  /** The length of the divider */
  length?: number | string;
  /** The thickness of the divider */
  thickness?: number;
  /** The direction of the divider */
  orientation?: "horizontal" | "vertical";
};

const CustomDivider: React.FC<DividerProps> = ({ children, ...props }) => {
  return (
    <Box
      style={{
        ...(props.style as any),
        height:
          props.orientation === "horizontal" ? props.thickness : props.length,
        width:
          props.orientation === "vertical" ? props.thickness : props.length,
      }}
    >
      {children}
    </Box>
  );
};

/** Divider is used to visually separate content in a list or group. */
const Divider = pearlify(CustomDivider, {
  componentName: "Divider",
  type: "atom",
});

export default Divider;
