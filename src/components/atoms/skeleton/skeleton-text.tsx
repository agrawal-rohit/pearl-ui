import React from "react";
import { FinalPearlTheme, ResponsiveValue } from "../../../theme/src/types";
import Skeleton, { SkeletonProps } from "./skeleton";
import Stack from "../stack/stack";
import { useTheme } from "../../../hooks/useTheme";

export type SkeletonTextProps = SkeletonProps & {
  /**
   * The spacing between the individual skeletons
   *
   * @default 3
   */
  spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
  /**
   * The height of each individual skeleton
   *
   * @default 15
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
const SkeletonText = React.memo(
  React.forwardRef(
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
        skeletonHeight = 15,
        ...rest
      }: SkeletonTextProps,
      ref: any
    ) => {
      const { colorMode } = useTheme();
      const numbers = React.useMemo(() => range(noOfLines), [noOfLines]);

      const keyPrefix = React.useMemo(
        () => `${colorMode}-${Math.random()}`,
        [
          isLoaded,
          colorMode,
          startColor,
          endColor,
          speed,
          fadeDuration,
          speed,
          colorScheme,
          skeletonHeight,
          spacing,
          rest,
        ]
      );

      const getWidth = React.useCallback(
        (index: number): any => {
          if (noOfLines > 1) {
            return index === numbers.length ? "80%" : "100%";
          }
          return "100%";
        },
        [noOfLines, numbers.length]
      );

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
                key={`${keyPrefix}-${number}`}
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
  )
);

SkeletonText.displayName = "SkeletonText";

export default SkeletonText;
