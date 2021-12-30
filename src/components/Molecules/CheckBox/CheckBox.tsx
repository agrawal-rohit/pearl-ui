import React, { useRef } from "react";
import Text from "../../Atoms/Text/Text";
import {
  FinalPearlTheme,
  ColorModeColor,
  ResponsiveValue,
  ColorScheme,
  ComponentSizes,
  ComponentVariants,
  PaletteColors,
} from "../../../theme/src/types";
import Icon from "../../Atoms/Icon/Icon";
import Pressable, { PressableProps } from "../../Atoms/Pressable/Pressable";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { useColorScheme } from "../../../hooks/useColorScheme";
import Stack from "../../Atoms/Stack/Stack";
import { boxStyleFunctions } from "../../Atoms/Box/Box";
import { useCheckBoxGroup } from "./CheckBoxGroup";
import { GestureResponderEvent } from "react-native";

export type CheckBoxProps = PressableProps & {
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
  /** The error message to be displayed if the checkbox is in an error state */
  errorMessage?: string;
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
  /** The background color of the checkbox when it is in checked state */
  checkedBackgroundColor?: ResponsiveValue<PaletteColors>;
  /** The border color of the checkbox when it is in checked state */
  checkedBorderColor?: ResponsiveValue<PaletteColors>;
  /** The border start color of the checkbox when it is in checked state */
  checkedBorderStartColor?: ResponsiveValue<PaletteColors>;
  /** The border end color of the checkbox when it is in checked state */
  checkedBorderEndColor?: ResponsiveValue<PaletteColors>;
  /** The border top color of the checkbox when it is in checked state */
  checkedBorderTopColor?: ResponsiveValue<PaletteColors>;
  /** The border left color of the checkbox when it is in checked state */
  checkedBorderLeftColor?: ResponsiveValue<PaletteColors>;
  /** The border right color of the checkbox when it is in checked state */
  checkedBorderRightColor?: ResponsiveValue<PaletteColors>;
  /** The border bottom color of the checkbox when it is in checked state */
  checkedBorderBottomColor?: ResponsiveValue<PaletteColors>;
  /** The background color of the checkbox when it is in an error state */
  errorBackgroundColor?: ResponsiveValue<PaletteColors>;
  /** The border color of the checkbox when it is in an error state */
  errorBorderColor?: ResponsiveValue<PaletteColors>;
  /** The border start color of the checkbox when it is in an error state */
  errorBorderStartColor?: ResponsiveValue<PaletteColors>;
  /** The border end color of the checkbox when it is in an error state */
  errorBorderEndColor?: ResponsiveValue<PaletteColors>;
  /** The border top color of the checkbox when it is in an error state */
  errorBorderTopColor?: ResponsiveValue<PaletteColors>;
  /** The border left color of the checkbox when it is in an error state */
  errorBorderLeftColor?: ResponsiveValue<PaletteColors>;
  /** The border right color of the checkbox when it is in an error state */
  errorBorderRightColor?: ResponsiveValue<PaletteColors>;
  /** The border bottom color of the checkbox when it is in an error state */
  errorBorderBottomColor?: ResponsiveValue<PaletteColors>;
};

/** The Checkbox component is used in forms when a user needs to select multiple values from several options. **/
const CheckBox = React.forwardRef(
  (
    { children, onPress = () => {}, ...rest }: CheckBoxProps,
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

    // OTHER METHODS
    const checkboxPressHandler = (event: GestureResponderEvent) => {
      if (isCheckBoxInGroup) {
        // Add the value to the group if the checkbox is currently unchecked
        if (!isCheckBoxChecked) addCheckBoxGroupValue(rest.value);
        else deleteCheckBoxGroupValue(rest.value);

        if (onPress) onPress(event);
      }
      if (onPress) onPress(event);
    };

    const capitalizeFirstLetter = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const computeCheckedorErrorProps = (
      propertyName: string,
      customfallbackProp:
        | ResponsiveValue<keyof FinalPearlTheme["palette"] | ColorModeColor>
        | ColorModeColor
        | undefined = undefined
    ) => {
      let fallbackProp;
      if (customfallbackProp) {
        fallbackProp = customfallbackProp;
      } else {
        fallbackProp = molecularProps.box[propertyName];
      }

      if (rest.isInvalid) {
        const checkedProp =
          (rest as any)[`error${capitalizeFirstLetter(propertyName)}`] ||
          molecularProps.box[`error${capitalizeFirstLetter(propertyName)}`];
        return checkedProp ? checkedProp : fallbackProp;
      }

      if (isCheckBoxChecked) {
        const checkedProp =
          (rest as any)[`checked${capitalizeFirstLetter(propertyName)}`] ||
          molecularProps.box[`checked${capitalizeFirstLetter(propertyName)}`];
        return checkedProp ? checkedProp : fallbackProp;
      }

      return fallbackProp;
    };

    // RENDER METHODS
    const renderErrorMessage = () => {
      if (rest.errorMessage && rest.isInvalid) {
        return <Text {...molecularProps.errorText}>{rest.errorMessage}</Text>;
      }
    };

    return (
      <>
        <Stack
          {...molecularProps.root}
          accessible={true}
          accessibilityRole="checkbox"
          accessibilityLabel={
            rest.accessibilityLabel
              ? rest.accessibilityLabel
              : (children as string)
          }
          accessibilityState={{
            disabled: rest.isDisabled,
            checked: isCheckBoxChecked,
          }}
          accessibilityHint={rest.accessibilityHint}
          opacity={rest.isDisabled ? 0.5 : 1}
          direction="horizontal"
          spacing={rest.spacing || molecularProps.root.spacing}
        >
          <Pressable
            {...molecularProps.box}
            ref={checkboxRef}
            onPress={checkboxPressHandler}
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
            isDisabled={rest.isDisabled}
            backgroundColor={computeCheckedorErrorProps(
              "backgroundColor",
              molecularProps.box.backgroundColor || molecularProps.box.bg
            )}
            borderRadius={
              molecularProps.box.shape === "square"
                ? molecularProps.box.borderRadius
                : "full"
            }
            borderColor={computeCheckedorErrorProps("borderColor")}
            borderStartColor={computeCheckedorErrorProps("borderStartColor")}
            borderEndColor={computeCheckedorErrorProps("borderEndColor")}
            borderTopColor={computeCheckedorErrorProps("borderTopColor")}
            borderLeftColor={computeCheckedorErrorProps("borderLeftColor")}
            borderRightColor={computeCheckedorErrorProps("borderRightColor")}
            borderBottomColor={computeCheckedorErrorProps("borderBottomColor")}
            androidRippleConfig={
              rest.androidRippleConfig
                ? rest.androidRippleConfig
                : { color: `${rest.colorScheme}.200` }
            }
          >
            <Icon
              {...molecularProps.icon}
              iconFamily={
                rest.isIndeterminate
                  ? rest.indeterminateIconFamily ||
                    molecularProps.icon.indeterminateIconFamily
                  : rest.checkedIconFamily ||
                    molecularProps.icon.checkedIconFamily
              }
              iconName={
                rest.isIndeterminate
                  ? rest.indeterminateIconName ||
                    molecularProps.icon.indeterminateIconName
                  : rest.checkedIconName || molecularProps.icon.checkedIconName
              }
              color={
                isCheckBoxChecked ? molecularProps.icon.color : "transparent"
              }
            />
          </Pressable>

          {children && (
            <Text {...molecularProps.text} alignSelf="center">
              {children}
            </Text>
          )}
        </Stack>
        {renderErrorMessage()}
      </>
    );
  }
);

export default CheckBox;
