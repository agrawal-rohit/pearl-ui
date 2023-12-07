import React from "react";
import Box, { BoxProps } from "../box/box";
import { AnimatePresence } from "moti";

type SlideFadeProps = BoxProps & {
  /** Whether to show the component */
  show: boolean;
  /**
   * The offset on the horizontal or x axis.
   *
   * @default 0
   */
  offsetX?: number;
  /**
   * The offset on the vertical or y axis.
   *
   * @default 10
   */
  offsetY?: number;
};

/**
 * SlideFade is a component that provides an view with a sliding fade transition.
 */
const SlideFade = React.memo(
  React.forwardRef(
    (
      {
        children,
        show,
        offsetX = 0,
        offsetY = 10,
        transition = {},
        exitTransition = {},
        ...rest
      }: SlideFadeProps,
      ref: any
    ) => {
      const from = React.useMemo(
        () => ({
          opacity: 0,
          ...(offsetX !== 0 && { translateX: offsetX }),
          ...(offsetY !== 0 && { translateY: offsetY }),
        }),
        [offsetX, offsetY]
      );

      const animate = React.useMemo(
        () => ({
          opacity: 1,
          translateX: 0,
          translateY: 0,
        }),
        []
      );

      const exit = React.useMemo(
        () => ({
          opacity: 0,
          ...(offsetX !== 0 && { translateX: offsetX }),
          ...(offsetY !== 0 && { translateY: offsetY }),
        }),
        [offsetX, offsetY]
      );

      return (
        <AnimatePresence>
          {show && (
            <Box
              ref={ref}
              {...rest}
              from={from}
              animate={animate}
              exit={exit}
              transition={
                {
                  dampingRatio: 1,
                  duration: 100,
                  type: "spring",
                  ...transition,
                } as any
              }
              exitTransition={
                {
                  dampingRatio: 1,
                  duration: 100,
                  type: "spring",
                  ...exitTransition,
                } as any
              }
            >
              {children}
            </Box>
          )}
        </AnimatePresence>
      );
    }
  )
);

SlideFade.displayName = "SlideFade";

export default SlideFade;
