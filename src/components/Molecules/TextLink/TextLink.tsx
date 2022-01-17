import React from "react";
import Text from "../../Atoms/Text/Text";
import Pressable, { PressableProps } from "../../Atoms/Pressable/Pressable";
import { MoleculeComponentProps } from "../../../theme/src/types";
import { pearlify } from "../../../hooks/pearlify";

export type BaseTextLinkProps = PressableProps & {
  children?: string;
};

const CustomTextLink = React.forwardRef(
  (
    {
      children,
      ...rest
    }: MoleculeComponentProps<"TextLink", BaseTextLinkProps>,
    ref: any
  ) => {
    const {
      colorScheme = "primary",
      isDisabled = false,
      atoms,
      ...props
    } = rest;

    return (
      <Pressable
        {...props}
        ref={ref}
        isDisabled={isDisabled}
        opacity={isDisabled ? 0.5 : 1}
        onPress={rest.onPress}
        accessibilityLabel={
          rest.accessibilityLabel ? rest.accessibilityLabel : children
        }
        accessibilityState={{ disabled: isDisabled }}
      >
        <Text {...atoms.text}>{children}</Text>
      </Pressable>
    );
  }
);

/** TextLink wraps a Text component with a Pressable component that can be used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation */
const TextLink = pearlify<BaseTextLinkProps, "molecule">(CustomTextLink, {
  componentName: "TextLink",
  type: "molecule",
  animatable: true,
});

export type TextLinkProps = React.ComponentProps<typeof TextLink>;

export default TextLink;
