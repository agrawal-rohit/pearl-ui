import React, { createContext, useContext } from "react";
import {
  ColorScheme,
  ComponentSizes,
  ComponentVariants,
  ResponsiveValue,
} from "../../../theme/src/types";
import Box, { BoxProps } from "../../Atoms/Box/Box";

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
  /** Size of all the children checkbox in the group. */
  size?: ResponsiveValue<ComponentSizes<"CheckBox">>;
  /** Variant of all the children checkbox in the group. */
  variant?: ResponsiveValue<ComponentVariants<"CheckBox">>;
  /** Whether the checkbox group is disabled.  */
  isDisabled?: boolean;
  /** Active color palette of all the children checkbox in the group. */
  colorScheme?: ColorScheme;
  /** Shape of all the children checkbox in the group. */
  shape?: "square" | "circle";
  /** Default active value of the checkbox group */
  defaultValue?: Array<string | number>;
  /** Active value of the checkbox group */
  value?: Array<string | number>;
  /** Method that gets invoked when the value of the checkbox group changes */
  onChange?(value: any): void;
};

const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({
  children,
  size = "m",
  variant = "filled",
  isDisabled = false,
  colorScheme = "primary",
  shape = "square",
  value = undefined,
  defaultValue = [],
  onChange = () => {},
  ...rest
}) => {
  const currentValue = value || defaultValue || [];

  const addCheckBoxGroupValue = (valueToAdd: string | number) => {
    onChange([...currentValue, valueToAdd]);
  };

  const deleteCheckBoxGroupValue = (valueToDelete: string | number) => {
    onChange(currentValue.filter((value) => value !== valueToDelete));
  };

  return (
    <Box {...rest}>
      <checkboxGroupContext.Provider
        value={{
          size,
          variant,
          isDisabled,
          colorScheme,
          shape,
          checkboxGroupValue: currentValue,
          addCheckBoxGroupValue,
          deleteCheckBoxGroupValue,
        }}
      >
        {children}
      </checkboxGroupContext.Provider>
    </Box>
  );
};

export default CheckBoxGroup;
