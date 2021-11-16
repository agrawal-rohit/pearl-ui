import { useState } from "react";
import { LayoutChangeEvent } from "react-native";

/**
 * Hook to covert an existing style props object to a different color scheme from the active theme palette.
 * @param targetColorScheme  Name of the target color scheme
 * @param props Style props object
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
