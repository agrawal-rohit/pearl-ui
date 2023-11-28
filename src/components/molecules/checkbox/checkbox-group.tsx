import React, { createContext, useContext } from "react";
import {
  ColorScheme,
  ComponentSizes,
  ComponentVariants,
  FinalPearlTheme,
  ResponsiveValue,
} from "../../../theme/src/types";
import Box, { BoxProps } from "../../atoms/box/box";
import Stack from "../../atoms/stack/stack";

interface ICheckBoxGroupContext {
  /** Size of all the checkbox children in the group. */
  size?: ResponsiveValue<ComponentSizes<"CheckBox">>;
  /** Variant of all the checkbox children in the group. */
  variant?: ResponsiveValue<ComponentVariants<"CheckBox">>;
  /** Whether the checkbox group is disabled.  */
  isDisabled?: boolean;
  /** Active color palette of all the checkbox children in the group. */
  colorScheme?: ColorScheme;
  /** Shape of all the checkbox children in the group. */
  shape?: "square" | "circle";
  /** Active values of the checkbox options in the group */
  checkboxGroupValue: Array<string | number> | undefined;
  /** Function to add a value to the active values of the group */
  addCheckBoxGroupValue(value: string | number | undefined): void;
  /** Function to remove a value from the active values of the group */
  deleteCheckBoxGroupValue(value: string | number | undefined): void;
}

const checkboxGroupContext = createContext({} as ICheckBoxGroupContext);

/**
 * Hook to get access to the state of a Checkbox group
 */
export const useCheckBoxGroup = () =>
  useContext(checkboxGroupContext) as ICheckBoxGroupContext;

export type CheckBoxGroupProps = BoxProps & {
  /**
   * Size of all the children checkbox in the group.
   *
   * @default "m"
   */
  size?: ResponsiveValue<ComponentSizes<"CheckBox">>;
  /**
   * Variant of all the children checkbox in the group.
   *
   * @default "filled"
   */
  variant?: ResponsiveValue<ComponentVariants<"CheckBox">>;
  /**
   * Whether the checkbox group is disabled.
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Active color palette of all the children checkbox in the group.
   *
   * @default "primary"
   */
  colorScheme?: ColorScheme;
  /**
   * The spacing between the elements.
   *
   * @default 2
   */
  spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
  /**
   * Shape of all the children checkbox in the group.
   *
   * @default "square"
   */
  shape?: "square" | "circle";
  /** Default active value of the checkbox group */
  defaultValue?: Array<string | number>;
  /** Active value of the checkbox group */
  value?: Array<string | number>;
  /** Method that gets invoked when the value of the checkbox group changes */
  onChange?(value: any): void;
};

/**
 * CheckBoxGroup is a component that groups together multiple CheckBox components.
 */
const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({
  children,
  isDisabled = false,
  shape = "square",
  value = undefined,
  defaultValue = [],
  spacing = "2",
  size = "m",
  variant = "filled",
  colorScheme = "primary",
  onChange = () => {},
  ...rest
}) => {
  const currentValue = value ?? defaultValue ?? [];

  const addCheckBoxGroupValue = (valueToAdd: string | number) => {
    onChange([...currentValue, valueToAdd]);
  };

  const deleteCheckBoxGroupValue = (valueToDelete: string | number) => {
    onChange(currentValue.filter((value) => value !== valueToDelete));
  };

  return (
    <checkboxGroupContext.Provider
      value={{
        size: size,
        shape: shape,
        variant: variant,
        isDisabled: isDisabled,
        colorScheme: colorScheme,
        checkboxGroupValue: currentValue,
        addCheckBoxGroupValue: addCheckBoxGroupValue,
        deleteCheckBoxGroupValue: deleteCheckBoxGroupValue,
      }}
    >
      <Stack direction="vertical" spacing={spacing} {...rest}>
        {children}
      </Stack>
    </checkboxGroupContext.Provider>
  );
};

CheckBoxGroup.displayName = "CheckBoxGroup";

export default CheckBoxGroup;
