import React from "react";
import Skeleton, { SkeletonProps } from "./skeleton";

export type SkeletonCircleProps = SkeletonProps & {
  /**
   * Size of the skeleton circle.
   *
   * @default {20}
   */
  boxSize?: number;
};

/**
 * `SkeletonCircle` is a layout component that displays a circular skeleton placeholder.
 */
const SkeletonCircle = React.memo(
  React.forwardRef(
    ({ boxSize = 20, ...rest }: SkeletonCircleProps, ref: any) => {
      return (
        <Skeleton
          borderRadius="full"
          w={boxSize}
          h={boxSize}
          {...rest}
          ref={ref}
        />
      );
    }
  )
);

SkeletonCircle.displayName = "SkeletonCircle";

export default SkeletonCircle;
