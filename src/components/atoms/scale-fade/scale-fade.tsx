import React from "react";
import Box, { BoxProps } from "../box/box";
import { AnimatePresence } from "moti";

export type ScaleFadeProps = BoxProps & {
  /** Whether to show the component */
  show: boolean;
  /**
   * The initial scale of the element.
   *
   * @default 0.7
   */
  initialScale?: number;
};

/**
 * ScaleFade is a component that provides an view with a scaling fade transition.
 */
const ScaleFade = React.memo(
  React.forwardRef(
    (
      {
        children,
        show,
        initialScale = 0.7,
        transition = {},
        exitTransition = {},
        ...rest
      }: ScaleFadeProps,
      ref: any
    ) => {
      const fromStyle = React.useMemo(
        () => ({ scale: initialScale, opacity: 0 }),
        [initialScale]
      );
      const animateStyle = React.useMemo(() => ({ scale: 1, opacity: 1 }), []);
      const exitStyle = React.useMemo(
        () => ({ scale: initialScale, opacity: 0 }),
        [initialScale]
      );
      const transitionProps = React.useMemo(
        () => ({
          dampingRatio: 1,
          duration: 100,
          type: "spring",
          ...(transition as any),
        }),
        [transition]
      );
      const exitTransitionProps = React.useMemo(
        () => ({
          dampingRatio: 1,
          duration: 100,
          type: "spring",
          ...(exitTransition as any),
        }),
        [exitTransition]
      );

      return (
        <AnimatePresence>
          {show && (
            <Box
              ref={ref}
              {...rest}
              from={fromStyle}
              animate={animateStyle}
              exit={exitStyle}
              transition={transitionProps}
              exitTransition={exitTransitionProps}
            >
              {children}
            </Box>
          )}
        </AnimatePresence>
      );
    }
  )
);

ScaleFade.displayName = "ScaleFade";

export default ScaleFade;
