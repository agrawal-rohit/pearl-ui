import React from "react";
import Box, { BoxProps } from "../box/box";
import { AnimatePresence } from "moti";

export type SlideProps = BoxProps & {
  /** Whether to show the component */
  show: boolean;
  /**
   * The direction of the slide transition
   *
   * @default "right"
   */
  direction?: "top" | "bottom" | "left" | "right";
};

/**
 * Slide is a component that provides an view with a sliding transition.
 */
const Slide = React.memo(
  React.forwardRef(
    (
      {
        children,
        show,
        direction = "right",
        transition = {},
        exitTransition = {},
        ...rest
      }: SlideProps,
      ref: any
    ) => {
      const from = React.useMemo(() => {
        switch (direction) {
          case "bottom":
            return { translateY: -500 };
          case "top":
            return { translateY: 500 };
          case "right":
            return { translateX: -500 };
          case "left":
            return { translateX: 500 };
          default:
            return {};
        }
      }, [direction]);

      const animate = React.useMemo(() => {
        switch (direction) {
          case "bottom":
          case "top":
            return { translateY: 0 };
          case "right":
          case "left":
            return { translateX: 0 };
          default:
            return {};
        }
      }, [direction]);

      const exit = React.useMemo(() => {
        switch (direction) {
          case "bottom":
            return { translateY: -500 };
          case "top":
            return { translateY: 500 };
          case "right":
            return { translateX: -500 };
          case "left":
            return { translateX: 500 };
          default:
            return {};
        }
      }, [direction]);

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
                  duration: 200,
                  type: "spring",
                  ...transition,
                } as any
              }
              exitTransition={
                {
                  dampingRatio: 1,
                  duration: 200,
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

Slide.displayName = "Slide";

export default Slide;
