import React from "react";
import Text from "../../Atoms/Text/Text";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import Pressable, { PressableProps } from "../../Atoms/Pressable/Pressable";
import {
  ColorScheme,
  ComponentSizes,
  ComponentVariants,
  ResponsiveValue,
} from "../../../theme/src/types";

export type TextLinkProps = PressableProps & {
  /** Size of the text link. */
  size?: ResponsiveValue<ComponentSizes<"TextLink">>;
  /** Variant of the text link. */
  variant?: ResponsiveValue<ComponentVariants<"TextLink">>;
  /** Active color palette of the text link */
  colorScheme?: ColorScheme;
};

/** TextLink wraps a Text component with a Pressable component that can be used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation */
const TextLink: React.FC<TextLinkProps> = ({
  children,
  colorScheme = "primary",
  isDisabled = false,
  ...rest
}) => {
  let molecularProps = useMolecularComponentConfig(
    "TextLink",
    rest,
    {
      size: rest["size"],
      variant: rest["variant"],
    },
    colorScheme
  );

  return (
    <Pressable
      {...molecularProps.root}
      isDisabled={isDisabled}
      opacity={isDisabled ? 0.5 : 1}
      onPress={rest.onPress}
      accessibilityLabel={
        rest.accessibilityLabel ? rest.accessibilityLabel : children
      }
      accessibilityState={{ disabled: isDisabled }}
      isDisabledAndroidRipple
    >
      <Text {...molecularProps.text}>{children}</Text>
    </Pressable>
  );
};

export default TextLink;
