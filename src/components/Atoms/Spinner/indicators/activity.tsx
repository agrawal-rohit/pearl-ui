import React, { useRef } from "react";
import { Animated, Easing, I18nManager, StyleSheet, View } from "react-native";
import Box from "../../../Atoms/Box/Box";
import Indicator, { IndicatorProps } from "./indicator";

export type ActivityIndicatorProps = IndicatorProps & {
  size?: number;
  color?: string;
  count?: number;
};

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  size = 30,
  count = 12,
  color = "rgb(0, 0, 0)",
  ...rest
}): JSX.Element => {
  const _renderComponent = ({
    index,
    count,
    progress,
  }: {
    index: number;
    count: number;
    progress: Animated.Value;
  }) => {
    let angle = (index * 360) / count;

    let layerStyle = {
      transform: [
        {
          rotate: angle + "deg",
        },
      ],
    };

    let inputRange = Array.from(
      new Array(count + 1),
      (item, index) => index / count
    );

    let outputRange = Array.from(new Array(count), (item, index) =>
      Math.max(1.0 - index * (1 / (count - 1)), 0)
    );

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop() as number);
    }

    outputRange.unshift(...outputRange.slice(-1));

    let barStyle = {
      width: size / 10,
      height: size / 4,
      borderRadius: size / 20,
      backgroundColor: color,
      opacity: progress.interpolate({ inputRange, outputRange }),
    };

    return (
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            justifyContent: "flex-start",
            alignItems: "center",
          },
          layerStyle,
        ]}
        {...{ key: index }}
      >
        <Animated.View style={barStyle} />
      </Animated.View>
    );
  };

  const { style, ...props } = rest;

  return (
    <View
      style={[
        { flex: 1, justifyContent: "center", alignItems: "center" },
        style,
      ]}
    >
      <Indicator
        {...props}
        style={{ width: size, height: size }}
        renderComponent={_renderComponent}
        count={count}
      />
    </View>
  );
};

export default ActivityIndicator;
