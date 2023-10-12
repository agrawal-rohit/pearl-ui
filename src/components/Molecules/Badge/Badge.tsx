import React from "react";
import Text from "../../atoms/text/text";
import { MoleculeComponentProps } from "../../../theme/src/types";
import Pressable, { PressableProps } from "../../atoms/pressable/pressable";
import { pearlify } from "../../../hooks/pearlify";

export type BaseBadgeProps = PressableProps;

const CustomBadge = React.forwardRef(
  (
    { children, ...props }: MoleculeComponentProps<"Badge", BaseBadgeProps>,
    ref: any
  ) => {
    const { atoms, ...rootProps } = props;

    const renderValue = () => {
      if (children === undefined) return null;

      if (Array.isArray(children)) children = children.join("");

      if (typeof children === "number" || typeof children === "string")
        return <Text {...atoms.text}>{children}</Text>;
      else return React.cloneElement(children as React.ReactElement);
    };

    return (
      <Pressable
        {...rootProps}
        ref={ref}
        alignItems="center"
        justifyContent="center"
        alignSelf="flex-start"
      >
        {renderValue()}
      </Pressable>
    );
  }
);

/** A Badge is a small component typically used to communicate a numerical value or indicate the status of an item to the user. */
const Badge = pearlify<BaseBadgeProps, "molecule">(CustomBadge, {
  componentName: "Badge",
  type: "molecule",
  animatable: true,
});

export type BadgeProps = React.ComponentProps<typeof Badge>;

export default Badge;
