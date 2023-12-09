import React, { useRef } from "react";
import { ViewStyle } from "react-native";
import Box, { BoxProps } from "../box/box";
import { AnimatePresence, MotiView } from "moti";
import { MotiWithPearlStyleProps } from "../../../theme/src/types";
import { BoxStyleProps } from "../../../theme/src/style-functions";
import { Easing } from "react-native-reanimated";

export type CollapseProps = BoxProps & {
  /** Whether to show the component */
  show: boolean;
  /**
   * If `true`, the opacity of the content will be animated
   * @default true
   */
  animateOpacity?: boolean;
  /**
   * The height you want the content in its collapsed state.
   * @default 0
   */
  startingHeight?: number | string;
  /**
   * The height you want the content in its expanded state.
   * @default "auto"
   */
  endingHeight?: number | string;
};

/**
 * Collapse is a component that provides an expandable view.
 */
const Collapse = React.memo(
  React.forwardRef(
    (
      {
        children,
        show,
        animateOpacity = true,
        startingHeight = 0,
        transition = {},
        exitTransition = {},
        endingHeight = "auto",
        ...rest
      }: CollapseProps,
      ref: any
    ) => {
      const endingHeightRef = useRef<number | string>(endingHeight);

      return (
        <AnimatePresence>
          {show && (
            <React.Fragment>
              <MotiView
                ref={ref}
                {...rest}
                from={{
                  ...(animateOpacity && { opacity: 0 }),
                  height: 0,
                }}
                animate={{
                  ...(animateOpacity && { opacity: 1 }),
                  height: show
                    ? typeof endingHeightRef.current === "string" &&
                      endingHeightRef.current.includes("auto")
                      ? "auto"
                      : endingHeightRef.current
                    : startingHeight,
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
                exit={{
                  ...(animateOpacity && { opacity: 0 }),
                  height: 0,
                }}
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
                <Box
                  onLayout={({ nativeEvent }) => {
                    if (
                      typeof endingHeightRef.current === "string" ||
                      nativeEvent.layout.height > endingHeightRef.current
                    )
                      endingHeightRef.current = Math.ceil(
                        nativeEvent.layout.height
                      );
                  }}
                >
                  {children}
                </Box>
              </MotiView>
            </React.Fragment>
          )}
        </AnimatePresence>
      );
    }
  )
);

Collapse.displayName = "Collapse";

export default Collapse;
