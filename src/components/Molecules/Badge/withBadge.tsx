import React, { useState } from "react";
import { LayoutChangeEvent, Platform } from "react-native";
import Box from "../../atoms/box/box";
import Badge, { BadgeProps } from "./badge";

interface BadgeOptions {
  /** The position of the badge with respect to the provided base component */
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  /** Amount of extra spacing to add between the badge and the base component */
  offset?: number;
  /** Whether the badge is visible or not */
  hidden?: boolean;
}

/**
 * A higher-order component which can be used to add a badge to any target component.
 * @param badgeValue The value to be displayed inside the badge
 * @param options A set of options for customizing the look of the badge
 * @returns
 */
const withBadge =
  <P extends {}>(
    badgeValue: string | number | React.ReactElement | undefined,
    options: BadgeOptions & BadgeProps = {}
  ) =>
  (WrappedComponent: React.FC<P>) =>
  (props: P) => {
    // Destructure options with default values
    const {
      placement = "topRight",
      offset = 5,
      hidden = false,
      ...badgeProps
    } = options;

    // State variables to hold the width of the base component and the badge
    const [baseComponentWidth, setBaseComponentWidth] = useState(0);
    const [badgeWidth, setBadgeWidth] = useState(0);

    // Function to compute the position of the badge based on the placement option
    const computePositionForBadge = () => {
      const positionValue = -1 * offset;

      if (placement === "topLeft")
        return { top: positionValue, left: positionValue };

      if (placement === "topRight")
        return { top: positionValue, right: positionValue };

      if (placement === "bottomLeft")
        return { bottom: positionValue, left: positionValue };

      // Return bottom right position by default
      return { bottom: positionValue, right: positionValue };
    };

    // Function to update the width of the badge when its layout changes
    const onBadgeLayoutChange = (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setBadgeWidth(width);
    };

    // Function to update the width of the base component when its layout changes
    const onBaseComponentLayoutChange = (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      setBaseComponentWidth(width);
    };

    // Function to compute the position of the badge with margins for web platform
    const computePositionWithWebMarginsForBadge = () => {
      const position = computePositionForBadge();

      if (Platform.OS === "web") {
        return {
          ...position,
          margin:
            position.right !== undefined
              ? baseComponentWidth - badgeWidth - position.right
              : position.left,
          marginVertical: 0,
          marginRight: 0,
        };
      }

      return position;
    };

    // Render the wrapped component with the badge
    return (
      <Box alignSelf="flex-start">
        <WrappedComponent
          {...(props as P)}
          onLayout={onBaseComponentLayoutChange}
        />
        {!hidden && (
          <Badge
            {...badgeProps}
            onLayout={onBadgeLayoutChange}
            position="absolute"
            zIndex="overlay"
            style={computePositionWithWebMarginsForBadge()}
          >
            {badgeValue}
          </Badge>
        )}
      </Box>
    ) as React.ReactElement<P>;
  };

export default withBadge;
