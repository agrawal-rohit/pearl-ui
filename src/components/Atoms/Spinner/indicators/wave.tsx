import React from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Indicator, { IndicatorProps } from "./indicator";

export type WaveIndicatorProps = IndicatorProps & {
  size?: number;
  color?: string;
  count?: number;
  waveFactor?: number;
  waveMode?: "fill" | "outline";
};

const floatEpsilon = Math.pow(2, -23);

const WaveIndicator = React.memo(
  React.forwardRef<WaveIndicatorProps, any>(
    (
      {
        size = 30,
        count = 4,
        color = "rgb(0, 0, 0)",
        animationDuration = 1600,
        animationEasing = Easing.out(Easing.ease),
        waveFactor = 0.54,
        waveMode = "fill",
        ...rest
      },
      ref
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
          let fill = waveMode === "fill";

          let factor = Math.max(1 - Math.pow(waveFactor, index), floatEpsilon);

          let waveStyle = {
            height: size,
            width: size,
            borderRadius: size / 2,
            borderWidth: fill ? 0 : Math.floor(size / 20),
            [fill ? "backgroundColor" : "borderColor"]: color,

            transform: [
              {
                scale: progress.interpolate({
                  inputRange: [factor, 1],
                  outputRange: [0, 1],
                  extrapolate: "clamp",
                }),
              },
            ],

            opacity: progress.interpolate({
              inputRange: [0, factor, 1],
              outputRange: [0, 1, 0],
            }),
          };

          return (
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                justifyContent: "center",
                alignItems: "center",
              }}
              {...{ key: index }}
            >
              <Animated.View style={waveStyle} />
            </Animated.View>
          );
        },
        [waveMode, waveFactor, size, color]
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
            animationEasing={animationEasing}
            count={count}
          />
        </View>
      );
    }
  )
);

export default WaveIndicator;
