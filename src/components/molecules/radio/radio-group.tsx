import React, { createContext, useContext, useState } from "react";
import {
  ColorScheme,
  ComponentSizes,
  ComponentVariants,
  FinalPearlTheme,
  ResponsiveValue,
} from "../../../theme/src/types";
import Box, { BoxProps } from "../../atoms/box/box";
import Stack from "../../atoms/stack/stack";

interface IRadioGroupContext {
  /** Size of all the children radio in the group. */
  size?: ResponsiveValue<ComponentSizes<"Radio">>;
  /** Variant of all the children radio in the group. */
  variant?: ResponsiveValue<ComponentVariants<"Radio">>;
  /** Whether the radio group is disabled.  */
  isDisabled?: boolean;
  /** Active color palette of all the children radio in the group. */
  colorScheme?: ColorScheme;
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
  size?: ResponsiveValue<ComponentSizes<"Radio">>;
  /** Variant of all the children radio in the group. */
  variant?: ResponsiveValue<ComponentVariants<"Radio">>;
  /** Whether the radio group is disabled.  */
  isDisabled?: boolean;
  /** Active color palette of all the children radio in the group. */
  colorScheme?: ColorScheme;
  /** The spacing between the elements */
  spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
  /** Default active value of the radio group */
  defaultValue?: string | number | undefined;
  /** Active value of the radio group */
  value?: string | number | undefined;
  /** Method that gets invoked when the value of the radio group changes */
  onChange?(value: any): void;
};

/**
 * RadioGroup is a component that groups together multiple Radio components.
 */
const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  isDisabled = false,
  value = undefined,
  defaultValue = undefined,
  spacing = "2",
  onChange = () => {},
  size = "m",
  variant = "filled",
  colorScheme = "primary",
  ...rest
}) => {
  const currentValue = value ?? defaultValue;
  const setRadioGroupValue = (value: string | number) => {
    onChange(value);
  };

  return (
    <radioGroupContext.Provider
      value={{
        size: size,
        variant: variant,
        isDisabled: isDisabled,
        colorScheme: colorScheme,
        radioGroupValue: currentValue,
        setRadioGroupValue: setRadioGroupValue,
      }}
    >
      <Stack
        direction="vertical"
        spacing={spacing}
        {...rest}
        accessibilityRole="radiogroup"
      >
        {children}
      </Stack>
    </radioGroupContext.Provider>
  );
};

export default RadioGroup;
