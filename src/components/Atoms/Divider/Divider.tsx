import React from "react";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import { View } from "react-native";
import { BoxProps } from "../../Atoms/Box/Box";

export type DividerProps = BoxProps & {
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
    variant: rest.variant,
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
