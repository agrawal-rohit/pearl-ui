import React from "react";
import Text from "../../atoms/text/text";
import {
  FinalPearlTheme,
  ResponsiveValue,
  MoleculeComponentProps,
  StateProps,
} from "../../../theme/src/types";
import Icon, { IconProps } from "../../atoms/icon/icon";
import Pressable, { PressableProps } from "../../atoms/pressable/pressable";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import Stack from "../../atoms/stack/stack";
import { useCheckBoxGroup } from "./checkbox-group";
import { boxStyleFunctions } from "../../../theme/src/style-functions";
import { useInvalidState } from "../../../hooks/state/useInvalidState";
import { useCheckedState } from "../../../hooks/state/useCheckedState";
import { useDisabledState } from "../../../hooks";
import Center from "../../atoms/center/center";
import { CheckboxAtoms } from "./checkbox.config";
import _ from "lodash";

export type CheckBoxProps = PressableProps &
  StateProps<"_checked" | "_invalid" | "_disabled"> & {
    /** Value of the checkbox if it is part of a group. */
    value?: string | number | undefined;
    /**
     * Whether the checkbox is disabled.
     *
     * @default false
     */
    isDisabled?: boolean;
    /**
     * Whether the checkbox is in a checked state.
     *
     * @default false
     */
    isChecked?: boolean;
    /**
     * Whether the checkbox is in an indeterminate state.
     *
     * @default false
     */
    isIndeterminate?: boolean;
    /**
     * Whether the checkbox is in an invalid state.
     *
     * @default false
     */
    isInvalid?: boolean;
    /**
     * The spacing between the checkbox and the label text.
     *
     * @default 2.5
     */
    spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
    /**
     * Shape of the checkbox.
     *
     * @default "square"
     */
    shape?: "square" | "circle";
    /**
     * Family of the icon when the checkbox is in checked state.
     *
     * @default "Ionicons"
     */
    checkedIconFamily?: IconProps["iconFamily"];
    /**
     * Name of the icon when the checkbox is in checked state.
     *
     * @default "checkmark-sharp"
     */
    checkedIconName?: IconProps["iconName"];
    /**
     * Family of the icon when the checkbox is in indeterminate state.
     *
     * @default "Ionicons"
     */
    indeterminateIconFamily?: IconProps["iconFamily"];
    /**
     * Name of the icon when the checkbox is in indeterminate state.
     *
     * @default "remove-outline"
     */
    indeterminateIconName?: IconProps["iconName"];
    children?: string;
  };

/** The Checkbox component is used in forms when a user needs to select multiple values from several options. **/
const CheckBox = React.memo(
  React.forwardRef(
    (
      {
        children,
        onPress = () => {},
        ...rest
      }: Omit<
        MoleculeComponentProps<"CheckBox", CheckBoxProps, CheckboxAtoms>,
        "atoms"
      > & {
        atoms?: CheckboxAtoms;
      },
      checkboxRef: any
    ) => {
      const {
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
      rest.size = rest.size ?? size;
      rest.variant = rest.variant ?? variant;
      rest.isDisabled = rest.isDisabled ?? isDisabled;
      rest.colorScheme = rest.colorScheme ?? colorScheme;
      rest.shape = rest.shape ?? shape;

      const isCheckBoxInGroup = addCheckBoxGroupValue !== undefined;
      const isCheckBoxChecked = isCheckBoxInGroup
        ? checkboxGroupValue?.includes(rest.value as string | number) &&
          rest.value !== undefined
        : rest.isChecked;

      const molecularProps = useMolecularComponentConfig<CheckboxAtoms>(
        "CheckBox",
        rest,
        {
          size: rest.size,
          variant: rest.variant,
        },
        rest.colorScheme,
        boxStyleFunctions,
        "container",
        "box",
        "container"
      );
      const { atoms } = molecularProps;

      // Use state for dynamic style
      const { propsWithCheckedStyles: propsWithCheckedStylesForBox } =
        useCheckedState(
          atoms.box,
          boxStyleFunctions,
          "molecule",
          true,
          isCheckBoxChecked
        );
      atoms.box = propsWithCheckedStylesForBox;
      const { propsWithCheckedStyles: propsWithCheckedStylesForIcon } =
        useCheckedState(
          atoms.icon,
          boxStyleFunctions,
          "molecule",
          true,
          isCheckBoxChecked
        );
      atoms.icon = propsWithCheckedStylesForIcon as IconProps;
      const { propsWithInvalidStyles } = useInvalidState(
        atoms.box,
        boxStyleFunctions,
        "molecule",
        true,
        rest.isInvalid
      );
      atoms.box = propsWithInvalidStyles;
      const { propsWithDisabledStyles } = useDisabledState(
        atoms.container,
        boxStyleFunctions,
        "molecule",
        true,
        rest.isDisabled
      );
      atoms.container = propsWithDisabledStyles;

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

      return (
        <Pressable
          {...atoms.container}
          ref={checkboxRef}
          onPress={checkboxPressHandler}
          accessible={true}
          accessibilityRole="checkbox"
          isDisabled={rest.isDisabled}
          accessibilityLabel={
            rest.accessibilityLabel ? rest.accessibilityLabel : children
          }
          accessibilityState={{
            disabled: rest.isDisabled,
            checked: isCheckBoxChecked,
          }}
          accessibilityHint={rest.accessibilityHint}
        >
          <Stack
            spacing={rest.spacing || atoms.container.spacing}
            direction="horizontal"
          >
            <Center
              {...atoms.box}
              borderRadius={
                atoms.box.shape === "circle" ? "full" : atoms.box.borderRadius
              }
            >
              <Icon
                {...atoms.icon}
                iconFamily={
                  rest.isIndeterminate
                    ? rest.indeterminateIconFamily ??
                      atoms.box.indeterminateIconFamily ??
                      "Ionicons"
                    : rest.checkedIconFamily ??
                      atoms.box.checkedIconFamily ??
                      "Ionicons"
                }
                iconName={
                  rest.isIndeterminate
                    ? rest.indeterminateIconName ??
                      atoms.box.indeterminateIconName ??
                      "remove-outline"
                    : rest.checkedIconName ??
                      atoms.box.checkedIconName ??
                      "checkmark-sharp"
                }
              />
            </Center>

            {!!children && <Text {...atoms.text}>{children}</Text>}
          </Stack>
        </Pressable>
      );
    }
  )
);

CheckBox.displayName = "CheckBox";

export default CheckBox;
