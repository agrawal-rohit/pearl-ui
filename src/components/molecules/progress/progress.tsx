import React, { useMemo } from "react";
import Box, { BoxProps } from "../../atoms/box/box";
import { MoleculeComponentProps } from "../../../theme/src/types";
import { pearl } from "../../../pearl";

export type BaseProgressProps = BoxProps & {
  /**
   * Value of the current progress (Between 0 and 100).
   *
   * @default 0
   */
  value?: number;
};

const BaseProgress = React.forwardRef(
  (
    {
      children,
      atoms,
      ...rest
    }: MoleculeComponentProps<"Progress", BaseProgressProps>,
    ref: any
  ) => {
    const { value, ...otherContainerProps } = atoms.container;
    const calculatedWidth = useMemo(() => `${value}%`, [value]);

    return (
      <Box
        {...otherContainerProps}
        ref={ref}
        accessible={true}
        accessibilityRole="progress"
        accessibilityLabel={
          rest.accessibilityLabel ? rest.accessibilityLabel : children
        }
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
