import React from "react";
import { Animated } from "react-native";
import Box from "../../box/box";
import Indicator, { IndicatorProps } from "./indicator";

export type BarIndicatorProps = IndicatorProps & {
  count?: number;
  size?: number;
  color?: string;
};

/** A component used to provide a visual cue that an action is either processing, awaiting a course of change or a result. */
const BarIndicator = React.memo(
  React.forwardRef(
    (
      {
        count = 3,
        size = 30,
        color = "rgb(0, 0, 0)",
        ...rest
      }: BarIndicatorProps,
      ref: any
    ): JSX.Element => {
      const outputRange = React.useCallback(
        (base: number, index: number, count: number, samples: number) => {
          let range = Array.from(
            new Array(samples),
            (item, index) =>
              base * Math.abs(Math.cos((Math.PI * index) / (samples - 1)))
          );

          for (let j = 0; j < index * (samples / count); j++) {
            range.unshift(range.pop() as number);
          }

          range.unshift(...range.slice(-1));

          return range;
        },
        []
      );

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
          let frames = (60 * (rest.animationDuration as number)) / 1000;
          let samples = 0;

          do samples += count;
          while (samples < frames);

          let inputRange = Array.from(
            new Array(samples + 1),
            (item, index) => index / samples
          );

          let width = Math.floor(size / 5),
            height = Math.floor(size / 2),
            radius = Math.ceil(width / 2);

          let containerStyle = {
            height: size,
            width: width,
            marginHorizontal: radius,
          };

          let topStyle = {
            width,
            height,
            backgroundColor: color,
            borderTopLeftRadius: radius,
            borderTopRightRadius: radius,
            transform: [
              {
                translateY: progress.interpolate({
                  inputRange,
                  outputRange: outputRange(
                    +(height - radius) / 2,
                    index,
                    count,
                    samples
                  ),
                }),
              },
            ],
          };

          let bottomStyle = {
            width,
            height,
            backgroundColor: color,
            borderBottomLeftRadius: radius,
            borderBottomRightRadius: radius,
            transform: [
              {
                translateY: progress.interpolate({
                  inputRange,
                  outputRange: outputRange(
                    -(height - radius) / 2,
                    index,
                    count,
                    samples
                  ),
                }),
              },
            ],
          };

          return (
            <Box style={containerStyle} {...{ key: index }}>
              <Animated.View style={topStyle} />
              <Animated.View style={bottomStyle} />
            </Box>
          );
        },
        [outputRange]
      );

      return (
        <Indicator
          {...rest}
          ref={ref}
          style={[
            {
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            },
            rest.style,
          ]}
          renderComponent={_renderComponent}
          count={count}
        />
      );
    }
  )
);

export default BarIndicator;
