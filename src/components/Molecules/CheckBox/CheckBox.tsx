import React, { useRef } from "react";
import Text from "../../Atoms/Text/Text";
import { BasePearlTheme, ColorModeColor } from "../../../theme/src/types";
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
  size?: string;
  /** Variant of the checkbox. */
  variant?: string;
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
  colorScheme?: string;
  /** The spacing between the checkbox and the label text */
  spacing?: keyof BasePearlTheme["spacing"];
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
  checkedBackgroundColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border color of the checkbox when it is in checked state */
  checkedBorderColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border start color of the checkbox when it is in checked state */
  checkedBorderStartColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border end color of the checkbox when it is in checked state */
  checkedBorderEndColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border top color of the checkbox when it is in checked state */
  checkedBorderTopColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border left color of the checkbox when it is in checked state */
  checkedBorderLeftColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border right color of the checkbox when it is in checked state */
  checkedBorderRightColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border bottom color of the checkbox when it is in checked state */
  checkedBorderBottomColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The background color of the checkbox when it is in an error state */
  errorBackgroundColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border color of the checkbox when it is in an error state */
  errorBorderColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border start color of the checkbox when it is in an error state */
  errorBorderStartColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border end color of the checkbox when it is in an error state */
  errorBorderEndColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border top color of the checkbox when it is in an error state */
  errorBorderTopColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border left color of the checkbox when it is in an error state */
  errorBorderLeftColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border right color of the checkbox when it is in an error state */
  errorBorderRightColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border bottom color of the checkbox when it is in an error state */
  errorBorderBottomColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
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
      boxStyleFunctions,
      "root",
      "box"
    );

    molecularProps = useColorScheme(rest.colorScheme, molecularProps);

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
        | keyof BasePearlTheme["palette"]
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
