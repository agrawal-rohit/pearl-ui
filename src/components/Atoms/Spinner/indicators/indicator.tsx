import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Platform, View } from "react-native";

type ViewProps = React.ComponentProps<typeof View>;

export type IndicatorProps = ViewProps & {
  animationEasing?: typeof Easing.linear;
  animationDuration?: number;
  count?: number;
  renderComponent?: (props: any) => JSX.Element;
};

/** A component used to provide a visual cue that an action is either processing, awaiting a course of change or a result. */
const Indicator: React.FC<IndicatorProps> = ({
  animationEasing = Easing.linear,
  animationDuration = 1200,
  renderComponent = (props: any) => {},
  count = 1,
  ...rest
}) => {
  const progress = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    let animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: Platform.OS !== "web", // Web doesn't support loops if using Native Driver,
      isInteraction: true,
      toValue: 1,
    });

    Animated.loop(animation).start();
  };

  const _renderComponent = (item: number, index: number) => {
    if ("function" === typeof renderComponent) {
      return renderComponent({ index, count, progress });
    }

    return null;
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Animated.View {...rest}>
      {Array.from(new Array(count), _renderComponent, this)}
    </Animated.View>
  );
};

export default Indicator;
