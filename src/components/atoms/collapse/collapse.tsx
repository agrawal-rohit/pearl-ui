import React, { useRef } from "react";
import { ViewStyle } from "react-native";
import Box, { BoxProps } from "../box/box";
import { AnimatePresence, MotiView } from "moti";
import { MotiWithPearlStyleProps } from "../../../theme/src/types";
import {
  BoxStyleProps,
  boxStyleFunctions,
} from "../../../theme/src/style-functions";
import { Easing } from "react-native-reanimated";
import { useStyleProps } from "../../../hooks";

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
      const actualHeightRef = useRef<number | string>(endingHeight);
      const computedStyles = useStyleProps(rest, boxStyleFunctions);

      return (
        <AnimatePresence>
          {show && (
            <React.Fragment>
              <MotiView
                ref={ref}
                {...computedStyles}
                from={{
                  ...(animateOpacity && { opacity: 0 }),
                  height: 0,
                }}
                animate={{
                  ...(animateOpacity && { opacity: 1 }),
                  height: show
                    ? typeof actualHeightRef.current === "string" &&
                      actualHeightRef.current.includes("auto")
                      ? "auto"
                      : actualHeightRef.current
                    : startingHeight,
                }}
                transition={
                  {
                    dampingRatio: 1,
                    duration: 150,
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
                    duration: 150,
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
                      typeof actualHeightRef.current === "string" ||
                      nativeEvent.layout.height > actualHeightRef.current
                    )
                      actualHeightRef.current = Math.ceil(
                        nativeEvent.layout.height +
                          (computedStyles.style.paddingTop || 0) +
                          (computedStyles.style.paddingBottom || 0)
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
