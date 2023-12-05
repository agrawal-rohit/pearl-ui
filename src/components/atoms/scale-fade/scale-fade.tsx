import React from "react";
import { ViewStyle } from "react-native";
import Box, { BoxProps } from "../box/box";
import { AnimatePresence } from "moti";
import { MotiWithPearlStyleProps } from "../../../theme/src/types";
import { BoxStyleProps } from "../../../theme/src/style-functions";
import { Easing } from "react-native-reanimated";

type ScaleFadeProps = BoxProps & {
  /** Whether to show the component */
  show: boolean;
  /**
   * The initial scale of the element.
   *
   * @default 0.9
   */
  initialScale?: number;
};

/**
 * ScaleFade is a component that provides an view with a scaling fade transition.
 */
const ScaleFade = React.forwardRef(
  (
    {
      children,
      show,
      initialScale = 0.9,
      transition = {},
      exitTransition = {},
      ...rest
    }: ScaleFadeProps,
    ref: any
  ) => {
    return (
      <AnimatePresence>
        {show && (
          <Box
            ref={ref}
            {...rest}
            from={{
              scale: initialScale,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: initialScale,
              opacity: 0,
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

ScaleFade.displayName = "ScaleFade";

export default ScaleFade;
