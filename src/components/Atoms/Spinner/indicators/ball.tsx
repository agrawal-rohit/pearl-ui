import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import Indicator, { IndicatorProps } from "./indicator";

export type BallIndicatorProps = IndicatorProps & {
  count?: number;
  size?: number;
  color?: string;
};

/** A component used to provide a visual cue that an action is either processing, awaiting a course of change or a result. */
const BallIndicator = React.memo(
  React.forwardRef<BallIndicatorProps, any>(
    (
      { count = 8, size = 30, color = "rgb(0, 0, 0)", ...rest },
      ref: any
    ): JSX.Element => {
      const _renderComponent = React.useCallback(
        ({
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

          let outputRange = Array.from(
            new Array(count),
            (item, index) => 1.2 - (0.5 * index) / (count - 1)
          );

          for (let j = 0; j < index; j++) {
            outputRange.unshift(outputRange.pop() as number);
          }

          outputRange.unshift(...outputRange.slice(-1));

          let ballStyle = {
            margin: size / 20,
            backgroundColor: color,
            width: size / 5,
            height: size / 5,
            borderRadius: size / 10,
            transform: [
              {
                scale: progress.interpolate({ inputRange, outputRange }),
              },
            ],
          };

          return (
            <Animated.View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                },
                layerStyle,
              ]}
              {...{ key: index }}
            >
              <Animated.View style={ballStyle} />
            </Animated.View>
          );
        },
        [count, size, color]
      );

      const { style, ...props } = rest;

      return (
        <View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            },
            style,
          ]}
        >
          <Indicator
            {...props}
            ref={ref}
            style={{ width: size, height: size }}
            renderComponent={_renderComponent}
            count={count}
          />
        </View>
      );
    }
  )
);

export default BallIndicator;
