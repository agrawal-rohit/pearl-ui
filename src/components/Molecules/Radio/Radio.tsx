import React from "react";
import Text from "../../atoms/text/text";
import {
  FinalPearlTheme,
  ResponsiveValue,
  ColorScheme,
  ComponentSizes,
  ComponentVariants,
  MoleculeComponentProps,
  StateProps,
} from "../../../theme/src/types";
import Pressable, { PressableProps } from "../../atoms/pressable/pressable";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import Stack from "../../atoms/stack/stack";
import Box from "../../atoms/box/box";
import { boxStyleFunctions } from "../../../theme/src/style-functions";
import { useRadioGroup } from "./radio-group";
import { useCheckedState } from "../../../hooks/state/useCheckedState";
import { useInvalidState } from "../../../hooks/state/useInvalidState";
import { useDisabledState } from "../../../hooks/state/useDisabledState";
import _ from "lodash";

export type RadioProps = PressableProps &
  StateProps<"_checked" | "_invalid" | "_disabled"> & {
    /** Size of the radio. */
    size?: ResponsiveValue<ComponentSizes<"Radio">>;
    /** Variant of the radio. */
    variant?: ResponsiveValue<ComponentVariants<"Radio">>;
    /** Value of the radio if it is part of a group. */
    value?: string | number | undefined;
    /** Whether the radio is disabled.  */
    isDisabled?: boolean;
    /** Whether the radio is in a checked state.  */
    isChecked?: boolean;
    /** Whether the radio is in an error state.  */
    isInvalid?: boolean;
    /** Active color palette of the radio */
    colorScheme?: ColorScheme;
    /** The spacing between the radio and the label text */
    spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
  };

/** The Radio component is used when only one choice may be selected in a series of options. **/
const Radio = React.forwardRef(
  (
    {
      children,
      onPress = () => {},
      ...rest
    }: Omit<MoleculeComponentProps<"Radio", RadioProps>, "atoms"> & {
      atoms?: Record<string, any>;
    },
    radioRef: any
  ) => {
    let {
      size,
      variant,
      isDisabled,
      colorScheme,
      radioGroupValue,
      setRadioGroupValue,
    } = useRadioGroup();

    // Overwrite props from radio group
    rest.size = size ?? rest.size;
    rest.variant = variant ?? rest.variant;
    rest.isDisabled = isDisabled ?? rest.isDisabled ?? false;
    rest.colorScheme = colorScheme ?? rest.colorScheme ?? "primary";

    const isRadioInGroup = setRadioGroupValue !== undefined;
    const isRadioChecked = isRadioInGroup
      ? rest.value === radioGroupValue && rest.value !== undefined
      : rest.isChecked;
    let molecularProps = useMolecularComponentConfig(
      "Radio",
      rest,
      {
        size: rest.size,
        variant: rest.variant,
      },
      rest.colorScheme,
      boxStyleFunctions,
      "container",
      "outerBox",
      "container"
    );

    const { atoms } = molecularProps;

    // Use state for dynamic style
    const { propsWithCheckedStyles } = useCheckedState(
      atoms.outerBox,
      boxStyleFunctions,
      "molecule",
      true,
      rest.isChecked
    );
    atoms.outerBox = propsWithCheckedStyles;
    const { propsWithInvalidStyles } = useInvalidState(
      atoms.outerBox,
      boxStyleFunctions,
      "molecule",
      true,
      rest.isInvalid
    );
    atoms.outerBox = propsWithInvalidStyles;
    const { propsWithDisabledStyles } = useDisabledState(
      atoms.outerBox,
      boxStyleFunctions,
      "molecule",
      true,
      rest.isDisabled
    );
    atoms.outerBox = propsWithDisabledStyles;

    // OTHER METHODS
    const radioPressHandler = () => {
      if (isRadioInGroup) {
        setRadioGroupValue(rest.value);
        if (onPress) onPress();
      }
      if (onPress) onPress();
    };

    return (
      <Stack
        {...atoms.container}
        accessible={true}
        accessibilityRole="radio"
        accessibilityLabel={
          rest.accessibilityLabel
            ? rest.accessibilityLabel
            : (children as string)
        }
        accessibilityState={{
          disabled: rest.isDisabled,
          checked: isRadioChecked,
        }}
        accessibilityHint={rest.accessibilityHint}
        opacity={rest.isDisabled ? 0.5 : 1}
        direction="horizontal"
      >
        <Pressable
          {...atoms.outerBox}
          ref={radioRef}
          onPress={radioPressHandler}
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
          isDisabled={rest.isDisabled}
        >
          <Box {...atoms.innerBox} width="100%" height="100%" />
        </Pressable>

        {children && (
          <Text {...atoms.text} alignSelf="center">
            {children}
          </Text>
        )}
      </Stack>
    );
  }
);

export default Radio;
