import React from "react";
import { ViewStyle } from "react-native";
import Box, { BoxProps } from "../box/box";
import { AnimatePresence } from "moti";
import { MotiWithPearlStyleProps } from "../../../theme/src/types";
import { BoxStyleProps } from "../../../theme/src/style-functions";
import { Easing } from "react-native-reanimated";

type SlideProps = BoxProps & {
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
const Slide = React.forwardRef(
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
    const getAnimationProps = () => {
      let from = {};
      let animate = {};
      let exit = {};
      switch (direction) {
        case "bottom":
          from = { translateY: -10000 };
          animate = { translateY: 0 };
          exit = { translateY: -10000 };
          break;
        case "top":
          from = { translateY: 10000 };
          animate = { translateY: 0 };
          exit = { translateY: 10000 };
          break;
        case "right":
          from = { translateX: -10000 };
          animate = { translateX: 0 };
          exit = { translateX: -10000 };
          break;
        case "left":
          from = { translateX: 10000 };
          animate = { translateX: 0 };
          exit = { translateX: 10000 };
          break;
      }

      return { from, animate, exit };
    };

    return (
      <AnimatePresence>
        {show && (
          <Box
            ref={ref}
            {...rest}
            {...getAnimationProps()}
            transition={
              {
                dampingRatio: 1,
                duration: 200,
                easing: Easing.inOut,
                ...transition,
                type: "spring",
              } as MotiWithPearlStyleProps<
                ViewStyle,
                BoxStyleProps
              >["transition"]
            }
            exitTransition={
              {
                dampingRatio: 1,
                duration: 200,
                easing: Easing.inOut,
                ...exitTransition,
                type: "spring",
              } as MotiWithPearlStyleProps<
                ViewStyle,
                BoxStyleProps
              >["exitTransition"]
            }
          >
            {children}
          </Box>
        )}
      </AnimatePresence>
    );
  }
);

Slide.displayName = "Slide";

export default Slide;
