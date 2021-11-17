import React, { createContext, useContext, useState } from "react";
import Box, { BoxProps } from "../../Atoms/Box/Box";

interface IRadioGroupContext {
  /** Size of all the children radio in the group. */
  size?: string;
  /** Variant of all the children radio in the group. */
  variant?: string;
  /** Whether the radio group is disabled.  */
  isDisabled?: boolean;
  /** Active color palette of all the children radio in the group. */
  colorScheme?: string;
  /** Active value of the radio options in the group */
  radioGroupValue: string | number | undefined;
  /** Function to update the active value of the group */
  setRadioGroupValue(value: string | number | undefined): void;
}

const radioGroupContext = createContext({} as IRadioGroupContext);

/**
 * Hook to get access to the state of a Radio group
 */
export const useRadioGroup = () =>
  useContext(radioGroupContext) as IRadioGroupContext;

export type RadioGroupProps = BoxProps & {
  /** Size of all the children radio in the group. */
  size?: string;
  /** Variant of all the children radio in the group. */
  variant?: string;
  /** Whether the radio group is disabled.  */
  isDisabled?: boolean;
  /** Active color palette of all the children radio in the group. */
  colorScheme?: string;
  /** Default active value of the radio group */
  defaultValue?: string | number | undefined;
  /** Active value of the radio group */
  value?: string | number | undefined;
  /** Method that gets invoked when the value of the radio group changes */
  onChange?(value: any): void;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  size = "m",
  variant = "filled",
  isDisabled = false,
  colorScheme = "primary",
  value = undefined,
  defaultValue = undefined,
  onChange = () => {},
  ...rest
}) => {
  const currentValue = value || defaultValue;
  const setRadioGroupValue = (value: string | number) => {
    onChange(value);
  };

  return (
    <Box {...rest} accessibilityRole="radiogroup">
      <radioGroupContext.Provider
        value={{
          size,
          variant,
          isDisabled,
          colorScheme,
          radioGroupValue: currentValue,
          setRadioGroupValue,
        }}
      >
        {children}
      </radioGroupContext.Provider>
    </Box>
  );
};

export default RadioGroup;
