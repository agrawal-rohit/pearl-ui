import React from "react";
import { Animated, I18nManager, View } from "react-native";
import Indicator, { IndicatorProps } from "./indicator";

export type PacmanIndicatorProps = IndicatorProps & {
  size?: number;
  color?: string;
};

/** A component used to provide a visual cue that an action is either processing, awaiting a course of change or a result. */
const PacmanIndicator: React.FC<PacmanIndicatorProps> = ({
  size = 30,
  color = "rgb(0, 0, 0)",
  ...rest
}): JSX.Element => {
  const _renderBlock = ({
    index,
    count,
    progress,
  }: {
    index: number;
    count: number;
    progress: Animated.Value;
  }) => {
    let transform: object[] = [
      {
        translateX: progress.interpolate({
          inputRange: [0.5, 1],
          outputRange: [0, size / (I18nManager.isRTL ? 4 : -4)],
          extrapolate: "clamp",
        }),
      },
    ];

    let style: any = {
      position: "absolute",
      top: size / 2 - size / 16,
      left: size / 2 + size / 16 + ((index - 2) * size) / 4,
      width: size / 8,
      height: size / 8,
      borderRadius: size / 16,
      backgroundColor: color,
      transform,
    };

    if (index === count - 1) {
      transform.push({
        scale: progress.interpolate({
          inputRange: [0, 0.5],
          outputRange: [0, 1],
          extrapolate: "clamp",
        }),
      });

      style.opacity = progress.interpolate({
        inputRange: [0, 0.25],
        outputRange: [0, 1],
        extrapolate: "clamp",
      });
    }

    return <Animated.View style={style} key={index} />;
  };

  const _renderComponent = ({
    index,
    count,
    progress,
  }: {
    index: number;
    count: number;
    progress: Animated.Value;
  }) => {
    if (index > 1) {
      return _renderBlock({ index, count, progress });
    }

    let hf = size / 2;
    let qr = size / 4;

    let pacmanStyle = {
      position: "absolute" as "absolute",
      top: qr,
      left: 0,

      width: hf,
      height: hf,

      transform: [
        {
          rotate: progress.interpolate({
            inputRange: [0, 0.67, 1],
            outputRange:
              index ^ (I18nManager.isRTL as any)
                ? ["0deg", "45deg", "0deg"]
                : ["0deg", "-45deg", "0deg"],
            extrapolate: "clamp",
          }),
        },
      ],
    };

    let containerStyle = {
      overflow: "hidden" as "hidden",
      width: hf,
      height: qr,
      ...(index
        ? {
            top: qr,
            borderBottomLeftRadius: qr,
            borderBottomRightRadius: qr,
          }
        : {
            borderTopLeftRadius: qr,
            borderTopRightRadius: qr,
          }),
      backgroundColor: color,
    };

    return (
      <Animated.View style={pacmanStyle} key={index}>
        <Animated.View style={containerStyle} />
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
        style={{ width: size * 1.25, height: size }}
        renderComponent={_renderComponent}
        count={5}
      />
    </View>
  );
};

export default PacmanIndicator;
