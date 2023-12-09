import React from "react";
import Box, { BoxProps } from "../box/box";
import { AnimatePresence } from "moti";
import { Easing } from "react-native-reanimated";

export type FadeProps = BoxProps & {
  /** Whether to show the component */
  show: boolean;
};

/**
 * Fade is a component that provides an view with a fade transition.
 */
const Fade = React.memo(
  React.forwardRef(
    (
      {
        children,
        show,
        transition = {},
        exitTransition = {},
        ...rest
      }: FadeProps,
      ref: any
    ) => {
      const fromStyle = React.useMemo(() => ({ opacity: 0 }), []);
      const animateStyle = React.useMemo(() => ({ opacity: 1 }), []);
      const exitStyle = React.useMemo(() => ({ opacity: 0 }), []);
      const transitionStyle = React.useMemo(
        () => ({
          dampingRatio: 1,
          duration: 100,
          easing: Easing.inOut,
          type: "spring",
          ...(transition as any),
        }),
        [transition]
      );
      const exitTransitionStyle = React.useMemo(
        () => ({
          dampingRatio: 1,
          duration: 100,
          easing: Easing.inOut,
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
              transition={transitionStyle}
              exitTransition={exitTransitionStyle}
            >
              {children}
            </Box>
          )}
        </AnimatePresence>
      );
    }
  )
);

Fade.displayName = "Fade";

export default Fade;
