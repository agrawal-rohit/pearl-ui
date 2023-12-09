import React from "react";
import { Animated, Easing } from "react-native";
import Indicator, { IndicatorProps } from "./indicator";

export type DotIndicatorProps = IndicatorProps & {
  count?: number;
  size?: number;
  color?: string;
};

const DotIndicator = React.memo(
  React.forwardRef(
    (
      {
        count = 4,
        size = 16,
        color = "rgb(0, 0, 0)",
        animationEasing = Easing.inOut(Easing.ease),
        ...rest
      }: DotIndicatorProps,
      ref: any
    ) => {
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
          let style = {
            width: size,
            height: size,
            margin: size / 2,
            borderRadius: size / 2,
            backgroundColor: color,
            transform: [
              {
                scale: progress.interpolate({
                  inputRange: [
                    0.0,
                    (index + 0.5) / (count + 1),
                    (index + 1.0) / (count + 1),
                    (index + 1.5) / (count + 1),
                    1.0,
                  ],
                  outputRange: [1.0, 1.36, 1.56, 1.06, 1.0],
                }),
              },
            ],
          };

          return <Animated.View style={style} {...{ key: index }} />;
        },
        [size, color]
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
          animationEasing={animationEasing}
          renderComponent={_renderComponent}
          count={count}
        />
      );
    }
  )
);

export default DotIndicator;
