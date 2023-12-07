import React from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Indicator, { IndicatorProps } from "./indicator";

export type SkypeIndicatorProps = IndicatorProps & {
  size?: number;
  color?: string;
  count?: number;
  minScale?: number;
  maxScale?: number;
};

const SkypeIndicator = React.memo(
  React.forwardRef<SkypeIndicatorProps, any>(
    (
      {
        size = 30,
        count = 5,
        color = "rgb(0, 0, 0)",
        animationDuration = 1600,
        minScale = 0.2,
        maxScale = 1.0,
        ...rest
      },
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
          let frames = (60 * animationDuration) / 1000;
          let offset = index / (count - 1);
          let easing = Easing.bezier(0.5, offset, 0.5, 1.0);

          let inputRange = Array.from(
            new Array(frames),
            (item, index) => index / (frames - 1)
          );

          let outputRange = Array.from(
            new Array(frames),
            (item, index) => easing(index / (frames - 1)) * 360 + "deg"
          );

          let layerStyle = {
            transform: [
              {
                rotate: progress.interpolate({ inputRange, outputRange }),
              },
            ],
          };

          let ballStyle = {
            width: size / 5,
            height: size / 5,
            borderRadius: size / 10,
            backgroundColor: color,
            transform: [
              {
                scale: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    maxScale - (maxScale - minScale) * offset,
                    minScale + (maxScale - minScale) * offset,
                  ],
                }),
              },
            ],
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
              <Animated.View style={ballStyle} />
            </Animated.View>
          );
        },
        [animationDuration, color, maxScale, minScale, size]
      );

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
            ref={ref}
            style={{ width: size, height: size }}
            renderComponent={_renderComponent}
            animationDuration={animationDuration}
            count={count}
          />
        </View>
      );
    }
  )
);

export default SkypeIndicator;
