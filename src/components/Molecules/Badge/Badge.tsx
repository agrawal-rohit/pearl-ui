import React from "react";
import Center from "../../Atoms/Center/Center";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import Text from "../../Atoms/Text/Text";
import { BoxProps } from "../../Atoms/Box/Box";
import { useColorScheme } from "../../../hooks/useColorScheme";
import {
  ColorScheme,
  ComponentSizes,
  ComponentVariants,
  FinalPearlTheme,
  ResponsiveValue,
} from "../../../theme/src/types";
import Pressable, { PressableProps } from "../../Atoms/Pressable/Pressable";

export type BadgeProps = PressableProps & {
  /** The size of the badge */
  size?: ResponsiveValue<ComponentSizes<"Badge">>;
  /** The variant of the badge */
  variant?: ResponsiveValue<ComponentVariants<"Badge">>;
  /** Active color palette of the badge */
  colorScheme?: ColorScheme;
};

/** A Badge is a small component typically used to communicate a numerical value or indicate the status of an item to the user. */
const Badge: React.FC<BadgeProps> = ({ children, ...rest }) => {
  let molecularProps = useMolecularComponentConfig(
    "Badge",
    rest,
    {
      size: rest.size,
      variant: rest.variant,
    },
    rest.colorScheme
  );

  const renderValue = () => {
    if (children === undefined) return null;

    if (Array.isArray(children)) children = children.join("");

    if (typeof children === "number" || typeof children === "string")
      return <Text {...molecularProps.text}>{children}</Text>;
    else return React.cloneElement(children as React.ReactElement);
  };

  return (
    <Pressable
      {...molecularProps.root}
      alignItems="center"
      justifyContent="center"
      alignSelf="flex-start"
    >
      {renderValue()}
    </Pressable>
  );
};

export default Badge;
