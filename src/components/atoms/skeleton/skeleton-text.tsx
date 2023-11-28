import React from "react";
import {
  FinalPearlTheme,
  PaletteColors,
  ResponsiveValue,
} from "../../../theme/src/types";
import Skeleton, { SkeletonProps } from "./skeleton";
import Stack from "../stack/stack";

type SkeletonTextProps = SkeletonProps & {
  /**
   * The spacing between the individual skeletons
   *
   * @default 3
   */
  spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
  /**
   * The height of each individual skeleton
   *
   * @default 20
   */
  skeletonHeight?: number;
  /**
   * The number of lines in the skeleton
   *
   * @default 3
   */
  noOfLines?: number;
};

function range(count: number) {
  return Array(count)
    .fill(1)
    .map((_, index) => index + 1);
}

/**
 * `SkeletonText` is used to display the loading state in the form of text.
 */
const SkeletonText = React.forwardRef(
  (
    {
      children,
      size,
      variant,
      colorScheme,
      startColor,
      endColor,
      fadeDuration,
      speed,
      spacing = "3",
      noOfLines = 3,
      isLoaded = false,
      skeletonHeight = 20,
      ...rest
    }: SkeletonTextProps,
    ref: any
  ) => {
    const numbers = range(noOfLines);

    const getWidth = (index: number): any => {
      if (noOfLines > 1) {
        return index === numbers.length ? "80%" : "100%";
      }
      return "100%";
    };

    return (
      <Stack
        w="100%"
        direction="vertical"
        spacing={spacing}
        {...rest}
        ref={ref}
      >
        {numbers.map((number, index) => {
          if (isLoaded && index > 0) {
            return null;
          }

          return (
            <Skeleton
              key={numbers.length.toString() + number}
              startColor={startColor}
              endColor={endColor}
              isLoaded={isLoaded}
              fadeDuration={fadeDuration}
              speed={speed}
              variant={variant}
              size={size}
              colorScheme={colorScheme}
              width={getWidth(index)}
              height={skeletonHeight}
            >
              {index === 0 ? children : undefined}
            </Skeleton>
          );
        })}
      </Stack>
    );
  }
);

SkeletonText.displayName = "SkeletonText";

export default SkeletonText;
