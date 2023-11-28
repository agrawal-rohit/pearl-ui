import React from "react";
import Box, { BoxProps } from "../box/box";
import { ResponsiveValue, PaletteColors } from "../../../theme";
import { pearl } from "../../../pearl";
import { BoxStyleProps } from "../../../theme/src/style-functions";
import { View } from "react-native";

type BaseSkeletonProps = BoxProps & {
  /**
   * The color at the animation start
   */
  startColor?: ResponsiveValue<PaletteColors>;
  /**
   * The color at the animation end
   */
  endColor?: ResponsiveValue<PaletteColors>;
  /**
   * If `true`, it'll render its children with a fade transition
   *
   * @default false
   */
  isLoaded?: boolean;
  /**
   * The animation speed in milliseconds
   *
   * @default 800
   */
  speed?: number;
  /**
   * The fadeIn duration in milliseconds. Requires `isLoaded` toggled to `true` in order to see the transition.
   *
   * @default 200
   */
  fadeDuration?: number;
};

const BaseSkeleton = React.forwardRef(
  (
    {
      startColor,
      endColor,
      isLoaded = false,
      speed = 800,
      fadeDuration = 200,
      ...rest
    }: BaseSkeletonProps,
    ref: any
  ) => {
    const [key, setKey] = React.useState(Math.random());

    React.useEffect(() => {
      setKey(Math.random());
    }, [isLoaded]);

    if (isLoaded) {
      return (
        <Box
          key={key}
          ref={ref}
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: fadeDuration,
          }}
        >
          {rest.children}
        </Box>
      );
    }

    rest.children = <View style={{ opacity: 0 }}>{rest.children}</View>;

    return (
      <Box
        {...rest}
        key={key}
        ref={ref}
        from={{ bgColor: startColor }}
        animate={{ bgColor: endColor }}
        transition={{
          loop: true,
          repeatReverse: true,
          duration: speed,
        }}
      />
    );
  }
);

/**
 * A Skeleton component that is used to show placeholders is a loading state
 */
const Skeleton = pearl<BaseSkeletonProps, "atom", BoxStyleProps>(BaseSkeleton, {
  componentName: "Skeleton",
  type: "atom",
});

export type SkeletonProps = React.ComponentProps<typeof Skeleton>;

Skeleton.displayName = "Skeleton";

export default Skeleton;
