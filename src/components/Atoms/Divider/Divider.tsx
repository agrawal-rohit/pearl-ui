import React from "react";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import {
  backgroundColor,
  opacity,
  layout,
  spacing,
  position,
} from "../../../theme/src/styleFunctions";
import {
  BackgroundColorProps,
  OpacityProps,
  VisibleProps,
  LayoutProps,
  SpacingProps,
  PositionProps,
  visible,
} from "../../../theme/src/styleFunctions";
import { StyleFunctionContainer } from "../../../theme/src/types";
import { View } from "react-native";

export type DividerStyleProps = BackgroundColorProps &
  OpacityProps &
  VisibleProps &
  LayoutProps &
  SpacingProps &
  PositionProps;

export const boxStyleFunctions = [
  backgroundColor,
  opacity,
  visible,
  layout,
  spacing,
  position,
] as StyleFunctionContainer[];

type DividerProps = DividerStyleProps & {
  /** The size of the divider */
  size?: string;
  /** The variant of the divider */
  variant?: string;
  /** The length of the divider */
  length?: number | string;
  /** The thickness of the divider */
  thickness?: number;
  /** The direction of the divider */
  orientation?: "horizontal" | "vertical";
};

/** Divider is used to visually separate content in a list or group. */
const Divider: React.FC<DividerProps> = ({ children, ...rest }) => {
  const props = useAtomicComponentConfig("Divider", rest, {
    size: rest.size,
    variant: rest.size,
  });

  return (
    <View
      style={[
        props.style,
        {
          height:
            props.orientation === "horizontal" ? props.thickness : props.length,
          width:
            props.orientation === "vertical" ? props.thickness : props.length,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default Divider;
