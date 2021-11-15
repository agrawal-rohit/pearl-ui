import React, { createContext, useContext, useState } from "react";
import Box, { BoxProps } from "../../Atoms/Box/Box";

export interface ICheckBoxGroupContext {
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

type CheckBoxGroupProps = BoxProps & {
  /** Default active value of the checkbox group */
  defaultValue?: Array<string | number>;
  /** Active value of the checkbox group */
  value?: Array<string | number>;
  /** Method that gets invoked when the the value of the checkbox group changes */
  onChange?(value: any): void;
};

const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({
  children,
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
