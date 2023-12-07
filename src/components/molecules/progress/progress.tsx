import React, { useMemo } from "react";
import Box, { BoxProps } from "../../atoms/box/box";
import { MoleculeComponentProps } from "../../../theme/src/types";
import { pearl } from "../../../pearl";
import { ProgressAtoms } from "./progress.config";
import { DimensionValue } from "react-native";

export type BaseProgressProps = BoxProps & {
  /**
   * Value of the current progress (Between 0 and 100).
   *
   * @default 0
   */
  value?: number;
};

const BaseProgress = React.memo(
  React.forwardRef(
    (
      {
        atoms,
      }: MoleculeComponentProps<"Progress", BaseProgressProps, ProgressAtoms>,
      ref: any
    ) => {
      const { value, ...otherContainerProps } = atoms.container;
      const calculatedWidth = useMemo<DimensionValue>(
        () => `${value || 0}%`,
        [value]
      );

      return (
        <Box
          {...otherContainerProps}
          ref={ref}
          accessible={true}
          accessibilityRole="progressbar"
          accessibilityLabel={otherContainerProps.accessibilityLabel}
        >
          <Box
            {...atoms.bar}
            animate={{ w: calculatedWidth }}
            borderRadius={
              value === 100 ? atoms.bar.borderTopLeftRadius : undefined
            }
          />
        </Box>
      );
    }
  )
);

/** The Progress component is a visual indicator of completion percentage. */
const Progress = pearl<BaseProgressProps, "molecule">(
  BaseProgress,
  {
    componentName: "Progress",
    type: "molecule",
    animatable: true,
  },
  undefined,
  {
    partForOverridenAnimationProps: "container",
    partForOverridenNativeProps: "container",
    partForOverridenStyleProps: "container",
  }
);

export type ProgressProps = React.ComponentProps<typeof Progress>;

Progress.displayName = "Progress";

export default Progress;
