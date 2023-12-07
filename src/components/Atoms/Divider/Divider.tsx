import React from "react";
import { BoxProps } from "../box/box";
import { AtomComponentProps } from "../../../theme/src/types";
import { pearl } from "../../../pearl";
import { View } from "react-native";

/**
 * BaseDividerProps is a type that extends BoxProps and adds properties specific to the Divider component.
 * It includes properties for length, thickness, and orientation of the divider.
 */
type BaseDividerProps = BoxProps & {
  /**
   * The length of the divider, can be a number or a string
   *
   * @default "100%"
   */
  length?: number | string;
  /**
   * The thickness of the divider, represented as a number
   *
   * @default 1
   */
  thickness?: number;
  /**
   * The direction of the divider, can be either "horizontal" or "vertical"
   *
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
};

/**
 * CustomDivider is a functional component that returns a Box component with specific styles based on the props.
 * It uses the forwardRef function from React to pass the ref to the Box component.
 */
const CustomDivider = React.memo(
  React.forwardRef(
    (
      {
        children,
        length = "100%",
        thickness = 1,
        orientation = "horizontal",
        ...props
      }: AtomComponentProps<"Divider", BaseDividerProps>,
      ref: any
    ) => {
      // Styles are applied based on the orientation of the divider
      const style = React.useMemo(
        () => ({
          ...(props.style as any),
          height: orientation === "horizontal" ? thickness : length,
          width: orientation === "vertical" ? thickness : length,
        }),
        [props.style, orientation, thickness, length]
      );

      return (
        <View ref={ref} {...props} style={style}>
          {children}
        </View>
      );
    }
  )
);

/**
 * Divider is a component used to visually separate content in a list or group.
 */
const Divider = pearl<BaseDividerProps, "atom">(CustomDivider, {
  componentName: "Divider",
  type: "atom",
  animatable: true,
});

/** DividerProps is a type that represents the props of the Divider component */
export type DividerProps = React.ComponentProps<typeof Divider>;

Divider.displayName = "Divider";

export default Divider;
