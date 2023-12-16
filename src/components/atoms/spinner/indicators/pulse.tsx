import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import Indicator, { IndicatorProps } from "./indicator";

export type PulseIndicatorProps = IndicatorProps & {
  size?: number;
  color?: string;
};

/** A component used to provide a visual cue that an action is either processing, awaiting a course of change or a result. */
const PulseIndicator = React.memo(
  React.forwardRef(
    (
      { size = 30, color = "rgb(0, 0, 0)", ...rest }: PulseIndicatorProps,
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
          let pulseStyle = {
            height: size,
            width: size,
            borderRadius: size / 2,
            backgroundColor: color,
            transform: [
              {
                scale: progress.interpolate({
                  inputRange: [0, 0.67, 1],
                  outputRange: index ? [0.4, 0.6, 0.4] : [0.4, 0.6, 1.0],
                }),
              },
            ],
            opacity: progress.interpolate({
              inputRange: [0, 0.67, 1],
              outputRange: index ? [1.0, 1.0, 1.0] : [0.5, 0.5, 0.0],
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
              <Animated.View style={pulseStyle} />
            </Animated.View>
          );
        },
        [size, color]
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
            count={2}
          />
        </View>
      );
    }
  )
);

export default PulseIndicator;
