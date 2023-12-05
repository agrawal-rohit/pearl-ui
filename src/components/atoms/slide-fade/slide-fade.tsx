import React from "react";
import { ViewStyle } from "react-native";
import Box, { BoxProps } from "../box/box";
import { AnimatePresence } from "moti";
import { MotiWithPearlStyleProps } from "../../../theme/src/types";
import { BoxStyleProps } from "../../../theme/src/style-functions";
import { Easing } from "react-native-reanimated";

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
const SlideFade = React.forwardRef(
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
    return (
      <AnimatePresence>
        {show && (
          <Box
            ref={ref}
            {...rest}
            from={{
              opacity: 0,
              ...(offsetX !== 0 && { translateX: offsetX }),
              ...(offsetY !== 0 && { translateY: offsetY }),
            }}
            animate={{
              opacity: 1,
              translateX: 0,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
              ...(offsetX !== 0 && { translateX: offsetX }),
              ...(offsetY !== 0 && { translateY: offsetY }),
            }}
            transition={
              {
                dampingRatio: 1,
                duration: 100,
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
                duration: 100,
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

SlideFade.displayName = "SlideFade";

export default SlideFade;
