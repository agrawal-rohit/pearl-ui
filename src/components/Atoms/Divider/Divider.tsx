import React from "react";
import Box, { BoxProps } from "../box/box";
import { AtomComponentProps } from "../../../theme/src/types";
import { pearlify } from "../../../hooks/pearlify";

export type BaseDividerProps = BoxProps & {
  /** The length of the divider */
  length?: number | string;
  /** The thickness of the divider */
  thickness?: number;
  /** The direction of the divider */
  orientation?: "horizontal" | "vertical";
};

const CustomDivider = React.forwardRef(
  (
    { children, ...props }: AtomComponentProps<"Divider", BaseDividerProps>,
    ref: any
  ) => {
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

/** Divider is used to visually separate content in a list or group. */
const Divider = pearlify<BaseDividerProps, "atom">(CustomDivider, {
  componentName: "Divider",
  type: "atom",
  animatable: true,
});

export type DividerProps = React.ComponentProps<typeof Divider>;

export default Divider;
