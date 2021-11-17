import { useState } from "react";
import { LayoutChangeEvent } from "react-native";

/**
 * Hook to covert a percentage based border radius value to an absolute numerical value.
 * @param rawBorderRadius The raw value of border radius that
 * @returns
 */
export const usePercentageBorderRadius = (
  rawBorderRadius: string | number | undefined
) => {
  const [width, setWidth] = useState<number>();

  const onLayoutChange = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setWidth(width);
  };

  const computeBorderRadius = (borderRadius: string | number | undefined) => {
    // Return the value as it is if the border radius is not a percentage
    if (!borderRadius || typeof borderRadius === "number") return borderRadius;

    // Convert percentage based border radius to number
    if (width) {
      const absolutePercentage =
        parseFloat(borderRadius.replace("%", "")) / 100;
      return absolutePercentage * width;
    }

    return undefined;
  };

  return {
    computedBorderRadius: computeBorderRadius(rawBorderRadius),
    onLayoutChange,
  };
};
