import React, { useMemo } from "react";
import Text from "../../atoms/text/text";
import { MoleculeComponentProps } from "../../../theme/src/types";
import Pressable, { PressableProps } from "../../atoms/pressable/pressable";
import { pearl } from "../../../pearl";
import { BadgeAtoms } from "./badge.config";

export type BaseBadgeProps = PressableProps;

/**
 * BaseBadge is a component that renders a badge with a value.
 * The value can be a number, a string, or a React element.
 * If the value is a number or a string, it will be rendered inside a Text component.
 * If the value is a React element, it will be cloned and rendered as is.
 * If the value is an array, it will be joined into a string and rendered inside a Text component.
 * If the value is undefined, nothing will be rendered.
 */
const BaseBadge = React.memo(
  React.forwardRef(
    (
      {
        children,
        atoms,
      }: MoleculeComponentProps<"Badge", BaseBadgeProps, BadgeAtoms>,
      ref: any
    ) => {
      // Function to render the value of the badge
      const renderValue = useMemo(() => {
        if (children === undefined) return null;

        // If children is an array, join it into a string
        if (Array.isArray(children)) children = children.join("");

        // If children is a number or a string, render it inside a Text component
        if (typeof children === "number" || typeof children === "string")
          return <Text {...atoms.text}>{children}</Text>;
        // If children is a React element, clone it and render it as is
        else return React.cloneElement(children as React.ReactElement);
      }, [children, atoms]);

      return (
        <Pressable
          {...atoms.box}
          ref={ref}
          alignItems="center"
          justifyContent="center"
        >
          {renderValue}
        </Pressable>
      );
    }
  )
);

/** A Badge is a small component typically used to communicate a numerical value or indicate the status of an item to the user. */
const Badge = pearl<BaseBadgeProps, "molecule", BadgeAtoms>(
  BaseBadge,
  {
    componentName: "Badge",
    type: "molecule",
    animatable: true,
  },
  undefined,
  {
    partForOverridenStyleProps: "box",
    partForOverridenNativeProps: "box",
    partForOverridenAnimationProps: "box",
  }
);

export type BadgeProps = React.ComponentProps<typeof Badge>;

Badge.displayName = "Badge";

export default Badge;
