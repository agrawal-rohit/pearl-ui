import React, { ReactElement } from "react";
import {
  ComponentSizes,
  ComponentVariants,
  FinalPearlTheme,
  PaletteColors,
  ResponsiveValue,
} from "../../../theme/src/types";
import { spacingStyleFunction } from "../../../theme/src/style-functions";
import Box, { BoxProps } from "../../atoms/box/box";
import { ZStack } from "../../atoms/stack/stack";
import Avatar from "./avatar";
import { avatarGroupContext } from "./useAvatarGroup";
import { useStyleProps } from "../../../hooks/useStyleProps";

export type AvatarGroupProps = BoxProps & {
  /** Size of all the children avatars in the group. */
  size?: ResponsiveValue<ComponentSizes<"Avatar">>;
  /** Variant of all the children avatars in the group. */
  variant?: ResponsiveValue<ComponentVariants<"Avatar">>;
  /** The spacing between the avatars */
  spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
  /** The background color of the circle which shows the "+X" label of remaining avatars */
  truncatedBackgroundColor?: ResponsiveValue<PaletteColors>;
  /** A custom component to show in place of the truncated avatars  */
  customTruncatedComponent?: React.ReactElement;
  /** Maximum number of avatars to show. It'll truncate the avatars and show a "+X" label (where X is the remaining avatars) */
  max?: number;
};

/**
 * AvatarGroup is a component that groups multiple Avatar components together. It can truncate the avatars and show a "+X" label (where X is the remaining avatars).
 */
const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max = 3,
  ...rest
}) => {
  // Convert the spacing to a style object
  const convertedElementSpacing = useStyleProps({ marginLeft: rest.spacing }, [
    ...spacingStyleFunction,
  ]);

  // Convert the children to an array
  const avatarChildren = React.Children.toArray(children);

  /**
   * Render the avatars.
   * @returns An array of Avatar components.
   */
  const renderAvatars = () => {
    return React.Children.map(avatarChildren, (child, index) => {
      const shouldBreakLoop = index > max;
      const shouldRenderAvatar = index + 1 <= max;

      if (shouldBreakLoop) return;

      if (shouldRenderAvatar)
        return React.cloneElement(child as ReactElement, {
          ...(child as ReactElement).props,
          style: {
            ...(child as ReactElement).props.style,
            marginLeft: index * convertedElementSpacing.style.marginLeft,
          },
        });
      else {
        if (rest.customTruncatedComponent)
          return React.cloneElement(rest.customTruncatedComponent, {
            ...rest.customTruncatedComponent.props,
            remainingAvatars: avatarChildren.length - max,
            style: {
              ...rest.customTruncatedComponent.props.style,
              marginLeft: index * convertedElementSpacing.style.marginLeft,
            },
          });

        return (
          <Avatar
            name={`+${avatarChildren.length - max}`}
            getInitials={(name: string) => name}
            backgroundColor={rest.truncatedBackgroundColor}
            style={{
              marginLeft: index * convertedElementSpacing.style.marginLeft,
            }}
          ></Avatar>
        );
      }
    });
  };

  return (
    <Box {...rest}>
      <avatarGroupContext.Provider
        value={{
          size: rest.size,
          variant: rest.variant,
        }}
      >
        <ZStack reversed>{renderAvatars()}</ZStack>
      </avatarGroupContext.Provider>
    </Box>
  );
};

export default AvatarGroup;
