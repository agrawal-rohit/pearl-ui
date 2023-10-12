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
import Icon from "../../atoms/icon/icon";
import Pressable, { PressableProps } from "../../atoms/pressable/pressable";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import Stack from "../../atoms/stack/stack";
import { useCheckBoxGroup } from "./checkbox-group";
import { boxStyleFunctions } from "../../../theme/src/style-functions";
import { useInvalidState } from "../../../hooks/state/useInvalidState";
import { useCheckedState } from "../../../hooks/state/useCheckedState";

export type CheckBoxProps = PressableProps &
  StateProps<"_checked" | "_invalid"> & {
    /** Size of the checkbox. */
    size?: ResponsiveValue<ComponentSizes<"CheckBox">>;
    /** Variant of the checkbox. */
    variant?: ResponsiveValue<ComponentVariants<"CheckBox">>;
    /** Value of the checkbox if it is part of a group. */
    value?: string | number | undefined;
    /** Whether the checkbox is disabled.  */
    isDisabled?: boolean;
    /** Whether the checkbox is in a checked state.  */
    isChecked?: boolean;
    /** Whether the checkbox is in an indeterminate state.  */
    isIndeterminate?: boolean;
    /** Whether the checkbox is in an error state.  */
    isInvalid?: boolean;
    /** Active color palette of the checkbox */
    colorScheme?: ColorScheme;
    /** The spacing between the checkbox and the label text */
    spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
    /** Shape of the checkbox */
    shape?: "square" | "circle";
    /** Family of the icon when the checkbox is in checked state */
    checkedIconFamily?:
      | "AntDesign"
      | "Entypo"
      | "EvilIcons"
      | "Feather"
      | "FontAwesome"
      | "FontAwesome5"
      | "Fontisto"
      | "Foundation"
      | "Ionicons"
      | "MaterialCommunityIcons"
      | "MaterialIcons"
      | "Octicons"
      | "SimpleLineIcons"
      | "Zocial";
    /** Name of the icon when the checkbox is in checked state */
    checkedIconName?: string;
    /** Family of the icon when the checkbox is in indeterminate state */
    indeterminateIconFamily?:
      | "AntDesign"
      | "Entypo"
      | "EvilIcons"
      | "Feather"
      | "FontAwesome"
      | "FontAwesome5"
      | "Fontisto"
      | "Foundation"
      | "Ionicons"
      | "MaterialCommunityIcons"
      | "MaterialIcons"
      | "Octicons"
      | "SimpleLineIcons"
      | "Zocial";
    /** Name of the icon when the checkbox is in indeterminate state */
    indeterminateIconName?: string;
    children?: string;
  };

/** The Checkbox component is used in forms when a user needs to select multiple values from several options. **/
const CheckBox = React.forwardRef(
  (
    {
      children,
      onPress = () => {},
      ...rest
    }: Omit<MoleculeComponentProps<"CheckBox", CheckBoxProps>, "atoms"> & {
      atoms?: Record<string, any>;
    },
    checkboxRef: any
  ) => {
    let {
      size,
      variant,
      isDisabled,
      colorScheme,
      shape,
      checkboxGroupValue,
      addCheckBoxGroupValue,
      deleteCheckBoxGroupValue,
    } = useCheckBoxGroup();

    // Overwrite props from checkbox group
    rest.size = size || rest.size;
    rest.variant = variant || rest.variant;
    rest.isDisabled = isDisabled || rest.isDisabled || false;
    rest.colorScheme = colorScheme || rest.colorScheme || "primary";
    rest.shape = shape || rest.shape || "square";

    const isCheckBoxInGroup = addCheckBoxGroupValue !== undefined;
    const isCheckBoxChecked = isCheckBoxInGroup
      ? checkboxGroupValue?.includes(rest.value as string | number) &&
        rest.value !== undefined
      : rest.isChecked;

    let molecularProps = useMolecularComponentConfig(
      "CheckBox",
      rest,
      {
        size: rest.size,
        variant: rest.variant,
      },
      rest.colorScheme,
      boxStyleFunctions,
      "root",
      "box"
    );
    const { atoms, ...rootProps } = molecularProps;

    // Use state for dynamic style
    const { propsWithCheckedStyles } = useCheckedState(
      atoms.box,
      boxStyleFunctions,
      "molecule",
      true,
      rest.isChecked
    );
    atoms.box = propsWithCheckedStyles;
    const { propsWithInvalidStyles } = useInvalidState(
      atoms.box,
      boxStyleFunctions,
      "molecule",
      true,
      rest.isInvalid
    );
    atoms.box = propsWithInvalidStyles;

    // OTHER METHODS
    const checkboxPressHandler = () => {
      if (isCheckBoxInGroup) {
        // Add the value to the group if the checkbox is currently unchecked
        if (!isCheckBoxChecked) addCheckBoxGroupValue(rest.value);
        else deleteCheckBoxGroupValue(rest.value);

        if (onPress) onPress();
      }
      if (onPress) onPress();
    };

    // RENDER METHODS
    return (
      <Stack
        {...rootProps}
        accessible={true}
        accessibilityRole="checkbox"
        accessibilityLabel={
          rest.accessibilityLabel ? rest.accessibilityLabel : children
        }
        accessibilityState={{
          disabled: rest.isDisabled,
          checked: isCheckBoxChecked,
        }}
        accessibilityHint={rest.accessibilityHint}
        direction="horizontal"
        spacing={rest.spacing || rootProps.spacing}
      >
        <Pressable
          {...atoms.box}
          ref={checkboxRef}
          onPress={checkboxPressHandler}
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
          isDisabled={rest.isDisabled}
          borderRadius={
            atoms.box.shape === "square" ? atoms.box.borderRadius : "full"
          }
        >
          <Icon
            {...atoms.icon}
            iconFamily={
              rest.isIndeterminate
                ? rest.indeterminateIconFamily ||
                  atoms.icon.indeterminateIconFamily
                : rest.checkedIconFamily || atoms.icon.checkedIconFamily
            }
            iconName={
              rest.isIndeterminate
                ? rest.indeterminateIconName || atoms.icon.indeterminateIconName
                : rest.checkedIconName || atoms.icon.checkedIconName
            }
            color={isCheckBoxChecked ? atoms.icon.color : "transparent"}
          />
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

export default CheckBox;
