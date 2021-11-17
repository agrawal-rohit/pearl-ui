import React from "react";
import Box from "../Box/Box";
import Badge, { BadgeProps } from "./Badge";

interface BadgeOptions {
  /** The position of the badge with respect to the provided base component */
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  /** Amount of extra spacing to add between the badge and the base component */
  offset?: number;
}

/**
 * A higher-order component which can be used to add a badge to a component
 * @param badgeValue The value to be displayed inside the badge
 * @param options A set of options for customizing the look of the badge
 * @returns
 */
export const withBadge =
  <P extends {}>(
    badgeValue: string | number | React.ReactElement | undefined,
    options: BadgeOptions & BadgeProps = {}
  ) =>
  (WrappedComponent: React.FC<P>) =>
  (props: P) => {
    const shouldBeHidden = !badgeValue;
    const { placement = "topRight", offset = 5, ...badgeProps } = options;

    const computePositionForBadge = () => {
      const positionValue = -1 * offset;

      if (placement === "topLeft")
        return { top: positionValue, left: positionValue };

      if (placement === "topRight")
        return { top: positionValue, right: positionValue };

      if (placement === "bottomLeft")
        return { bottom: positionValue, left: positionValue };

      if (placement === "bottomRight")
        return { bottom: positionValue, right: positionValue };
    };

    return (
      <Box alignSelf="flex-start">
        <WrappedComponent {...(props as P)} />
        {!shouldBeHidden && (
          <Badge
            {...badgeProps}
            position="absolute"
            style={computePositionForBadge()}
          >
            {badgeValue}
          </Badge>
        )}
      </Box>
    ) as React.ReactElement<P>;
  };
