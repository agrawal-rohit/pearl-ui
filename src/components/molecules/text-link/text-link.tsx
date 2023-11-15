import React from "react";
import Text from "../../atoms/text/text";
import Pressable, { PressableProps } from "../../atoms/pressable/pressable";
import { MoleculeComponentProps } from "../../../theme/src/types";
import { pearlify } from "../../../pearlify";

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
    const { atoms } = rest;
    const isDisabled = atoms.container.isDisabled ?? false;

    return (
      <Pressable
        {...atoms.container}
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
