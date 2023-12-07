import React, { useCallback, useEffect, useRef } from "react";
import { Animated, Easing, Platform, View } from "react-native";

type ViewProps = React.ComponentProps<typeof View>;

export type IndicatorProps = ViewProps & {
  animationEasing?: typeof Easing.linear;
  animationDuration?: number;
  count?: number;
  renderComponent?: (props: any) => JSX.Element;
};

/** A component used to provide a visual cue that an action is either processing, awaiting a course of change or a result. */
const Indicator = React.memo(
  React.forwardRef<IndicatorProps, any>(
    (
      {
        animationEasing = Easing.linear,
        animationDuration = 1200,
        renderComponent = () => {},
        count = 1,
        ...rest
      },
      ref
    ) => {
      const progress = useRef(new Animated.Value(0)).current;

      const startAnimation = useCallback(() => {
        let animation = Animated.timing(progress, {
          duration: animationDuration,
          easing: animationEasing,
          useNativeDriver: Platform.OS !== "web", // Web doesn't support loops if using Native Driver,
          isInteraction: true,
          toValue: 1,
        });

        Animated.loop(animation).start();
      }, [animationDuration, animationEasing, progress]);

      const _renderComponent = useCallback(
        (item: number, index: number) => {
          if ("function" === typeof renderComponent) {
            return renderComponent({ index, count, progress });
          }

          return null;
        },
        [renderComponent, count, progress]
      );

      useEffect(() => {
        startAnimation();
      }, []);

      return (
        <Animated.View {...rest} ref={ref}>
          <>{Array.from(new Array(count), _renderComponent, this)}</>
        </Animated.View>
      );
    }
  )
);

export default Indicator;
