import React from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Indicator, { IndicatorProps } from "./indicator";

export type MaterialIndicatorProps = IndicatorProps & {
  count?: number;
  size?: number;
  color?: string;
};

/** A component used to provide a visual cue that an action is either processing, awaiting a course of change or a result. */
const MaterialIndicator = React.memo(
  React.forwardRef(
    (
      {
        count = 2,
        size = 30,
        color = "rgb(0, 0, 0)",
        animationDuration = 3600,
        ...rest
      }: MaterialIndicatorProps,
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
          const trackWidth = size / 10;

          let frames = (60 * animationDuration) / 1000;
          let easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);

          let sa = 7.5;
          let ea = 30;

          let sequences = 3;
          let rotations = 5;

          let inputRange = Array.from(
            new Array(frames),
            (item, frameIndex) => frameIndex / (frames - 1)
          );

          let outputRange = Array.from(
            new Array(frames),
            (item, frameIndex) => {
              let progress = (2 * sequences * frameIndex) / (frames - 1);
              let rotation = index ? +(360 - sa) : -(180 - sa);

              let sequence = Math.ceil(progress);

              if (sequence % 2) {
                progress = progress - sequence + 1;
              } else {
                progress = sequence - progress;
              }

              let direction = index ? -1 : +1;

              return (
                direction * (180 - (sa + ea)) * easing(progress) +
                rotation +
                "deg"
              );
            }
          );

          let layerStyle = {
            width: size,
            height: size,
            transform: [
              {
                rotate: 90 - sa + "deg",
              },
              {
                rotate: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", 360 * rotations + "deg"],
                }),
              },
            ],
          };

          let viewportStyle = {
            width: size,
            height: size,
            transform: [
              {
                translateY: index ? -size / 2 : 0,
              },
              {
                rotate: progress.interpolate({ inputRange, outputRange }),
              },
            ],
          };

          let containerStyle = {
            width: size,
            height: size / 2,
            overflow: "hidden" as "hidden",
          };

          let offsetStyle = index ? { top: size / 2 } : null;

          let lineStyle = {
            width: size,
            height: size,
            borderColor: color,
            borderRadius: size / 2,
            borderWidth: trackWidth,
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
              <Animated.View style={layerStyle}>
                <Animated.View
                  style={[containerStyle, offsetStyle]}
                  collapsable={false}
                >
                  <Animated.View style={viewportStyle}>
                    <Animated.View style={containerStyle} collapsable={false}>
                      <Animated.View style={lineStyle} />
                    </Animated.View>
                  </Animated.View>
                </Animated.View>
              </Animated.View>
            </Animated.View>
          );
        },
        [size, color, animationDuration]
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
            count={2}
          />
        </View>
      );
    }
  )
);

export default MaterialIndicator;
