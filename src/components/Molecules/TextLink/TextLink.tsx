import React from "react";
import Text from "../../Atoms/Text/Text";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { useColorScheme } from "../../../hooks/useColorScheme";
import Pressable, { PressableProps } from "../../Atoms/Pressable/Pressable";

type TextLinkProps = PressableProps & {
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
  ...props
}) => {
  let multiComponentStyles = useMolecularComponentConfig("TextLink", props, {
    size: props["size"],
    variant: props["variant"],
  });
  if (colorScheme !== "primary") {
    multiComponentStyles = useColorScheme(colorScheme, multiComponentStyles);
  }

  return (
    <Pressable
      isDisabled={isDisabled}
      opacity={isDisabled ? 0.5 : 1}
      onPress={props.onPress}
      accessibilityLabel={
        props.accessibilityLabel ? props.accessibilityLabel : children
      }
      accessibilityState={{ disabled: isDisabled }}
      isDisabledAndroidRipple
      {...multiComponentStyles.root}
    >
      <Text {...multiComponentStyles.text}>{children}</Text>
    </Pressable>
  );
};

export default TextLink;
