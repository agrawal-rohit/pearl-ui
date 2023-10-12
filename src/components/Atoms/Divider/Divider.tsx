import React from "react";
import Box, { BoxProps } from "../box/box";
import { AtomComponentProps } from "../../../theme/src/types";
import { pearlify } from "../../../hooks/pearlify";

/**
 * BaseDividerProps is a type that extends BoxProps and adds properties specific to the Divider component.
 * It includes properties for length, thickness, and orientation of the divider.
 */
export type BaseDividerProps = BoxProps & {
  /** The length of the divider, can be a number or a string */
  length?: number | string;
  /** The thickness of the divider, represented as a number */
  thickness?: number;
  /** The direction of the divider, can be either "horizontal" or "vertical" */
  orientation?: "horizontal" | "vertical";
};

/**
 * CustomDivider is a functional component that returns a Box component with specific styles based on the props.
 * It uses the forwardRef function from React to pass the ref to the Box component.
 */
const CustomDivider = React.forwardRef(
  (
    { children, ...props }: AtomComponentProps<"Divider", BaseDividerProps>,
    ref: any
  ) => {
    // Styles are applied based on the orientation of the divider
    return (
      <Box
        ref={ref}
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
  }
);

/**
 * Divider is a component used to visually separate content in a list or group.
 */
const Divider = pearlify<BaseDividerProps, "atom">(CustomDivider, {
  componentName: "Divider",
  type: "atom",
  animatable: true,
});

/** DividerProps is a type that represents the props of the Divider component */
export type DividerProps = React.ComponentProps<typeof Divider>;

export default Divider;
