import React from "react";
import Text from "../../Atoms/Text/Text";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { useColorScheme } from "../../../hooks/useColorScheme";
import Pressable, { PressableProps } from "../../Atoms/Pressable/Pressable";

export type TextLinkProps = PressableProps & {
  /** Size of the text link. */
  size?: string;
  /** Variant of the text link. */
  variant?: string;
  /** Active color palette of the text link */
  colorScheme?: string;
};

/** TextLink wraps a Text component with a Pressable component that can be used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation */
const TextLink: React.FC<TextLinkProps> = ({
  children,
  colorScheme = "primary",
  isDisabled = false,
  ...rest
}) => {
  let molecularProps = useMolecularComponentConfig("TextLink", rest, {
    size: rest["size"],
    variant: rest["variant"],
  });
  molecularProps = useColorScheme(colorScheme, molecularProps);

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
