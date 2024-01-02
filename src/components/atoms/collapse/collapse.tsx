import React, { useRef } from "react";
import { ViewStyle } from "react-native";
import Box, { BoxProps } from "../box/box";
import { AnimatePresence, MotiView } from "moti";
import { MotiWithPearlStyleProps } from "../../../theme/src/types";
import {
  BoxStyleProps,
  boxStyleFunctions,
} from "../../../theme/src/style-functions";
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
                  height: startingHeight,
                }}
                animate={{
                  ...(animateOpacity && { opacity: 1 }),
                  height: actualHeightRef.current,
                }}
                transition={
                  {
                    dampingRatio: 1,
                    duration: 150,
                    ...transition,
                    type: "spring",
                  } as MotiWithPearlStyleProps<
                    ViewStyle,
                    BoxStyleProps
                  >["transition"]
                }
                exit={{
                  ...(animateOpacity && { opacity: 0 }),
                  height: startingHeight as any,
                }}
                exitTransition={
                  {
                    dampingRatio: 1,
                    duration: 150,
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
                    const currentHeight =
                      nativeEvent.layout.height +
                      (computedStyles.style.paddingTop || 0) +
                      (computedStyles.style.paddingBottom || 0);

                    if (
                      typeof actualHeightRef.current === "string" ||
                      currentHeight > actualHeightRef.current
                    )
                      actualHeightRef.current = Math.ceil(currentHeight);
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
