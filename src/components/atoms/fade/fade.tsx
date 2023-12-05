import React from "react";
import { ViewStyle } from "react-native";
import Box, { BoxProps } from "../box/box";
import { AnimatePresence } from "moti";
import { MotiWithPearlStyleProps } from "../../../theme/src/types";
import { BoxStyleProps } from "../../../theme/src/style-functions";
import { Easing } from "react-native-reanimated";

type FadeProps = BoxProps & {
  /** Whether to show the component */
  show: boolean;
};

/**
 * Fade is a component that provides an view with a fade transition.
 */
const Fade = React.forwardRef(
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
    return (
      <AnimatePresence>
        {show && (
          <Box
            ref={ref}
            {...rest}
            from={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
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

Fade.displayName = "Fade";

export default Fade;
