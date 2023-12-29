import React from "react";
import { BoxProps } from "../box/box";
import Stack, { HStack } from "../stack/stack";
import Icon from "../icon/icon";
import Text from "../text/text";

export type ListProps = BoxProps & {
  /**
   * Icon to be displayed in the list.
   */
  renderIcon?: (index: number) => React.ReactElement;
};

/**
 * List is a layout component that arranges its children into a list.
 * Each child is given an equal amount of space.
 * An optional icon can be displayed next to each child.
 */
const List = React.memo(
  React.forwardRef(
    ({ children, renderIcon = undefined, ...props }: ListProps, ref: any) => {
      return (
        <Stack ref={ref} {...props}>
          {React.Children.map(children, (child, index) => (
            <HStack key={index} spacing="2.5">
              {renderIcon && renderIcon(index)}
              {child}
            </HStack>
          ))}
        </Stack>
      );
    }
  )
);

/**
 * OrderedList is a layout component that arranges its children into an ordered list.
 */
export const OrderedList = React.memo(
  React.forwardRef(({ children, ...rest }: ListProps, ref) => {
    return (
      <List
        {...rest}
        renderIcon={() => (
          <Icon iconFamily="FontAwesome" iconName="circle" rawSize={6} mt="2" />
        )}
        ref={ref}
      >
        {children}
      </List>
    );
  })
);

/**
 * UnorderedList is a layout component that arranges its children into an unordered list.
 */
export const UnorderedList = React.memo(
  React.forwardRef(({ children, ...rest }: ListProps, ref) => {
    return (
      <List
        {...rest}
        renderIcon={(index) => <Text variant="p4">{index + 1}.</Text>}
        ref={ref}
      >
        {children}
      </List>
    );
  })
);

List.displayName = "List";
OrderedList.displayName = "OrderedList";
UnorderedList.displayName = "UnorderedList";

export default List;
