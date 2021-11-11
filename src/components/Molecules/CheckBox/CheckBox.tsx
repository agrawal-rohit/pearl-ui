import React, { useRef } from "react";
import Text from "../../Atoms/Text/Text";
import { BasePearlTheme, ColorModeColor } from "../../../theme/src/types";
import Icon from "../../Atoms/Icon/Icon";
import Pressable, { PressableProps } from "../../Atoms/Pressable/Pressable";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { useColorScheme } from "../../../hooks/useColorScheme";
import Stack from "../../Atoms/Stack/Stack";
import { boxStyleFunctions } from "../../Atoms/Box/Box";

export type CheckBoxProps = PressableProps & {
  /** Size of the checkbox. */
  size?: string;
  /** Variant of the checkbox. */
  variant?: string;
  /** Whether the checkbox is disabled.  */
  isDisabled?: boolean;
  /** Whether the checkbox is in a checked state.  */
  isChecked?: boolean;
  /** Whether the checkbox is in an indeterminate state.  */
  isIndeterminate?: boolean;
  /** Whether the checkbox is in an error state.  */
  isErrorVisible?: boolean;
  /** The error message to be displayed if the checkbox is in an error state */
  errorMessage?: string;
  /** Active color palette of the checkbox */
  colorScheme?: string;
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
    {
      children,
      size = "m",
      isDisabled = false,
      colorScheme = "primary",
      shape = "square",
      ...rest
    }: CheckBoxProps,
    checkboxRef: any
  ) => {
    let molecularProps = useMolecularComponentConfig(
      "CheckBox",
      rest,
      {
        size: size,
        variant: rest["variant"],
      },
      boxStyleFunctions,
      "root",
      "box"
    );
    molecularProps = useColorScheme(colorScheme, molecularProps);

    // OTHER METHODS
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

      if (rest.isErrorVisible) {
        const checkedProp =
          (rest as any)[`error${capitalizeFirstLetter(propertyName)}`] ||
          molecularProps.box[`error${capitalizeFirstLetter(propertyName)}`];
        return checkedProp ? checkedProp : fallbackProp;
      }

      if (rest.isChecked) {
        const checkedProp =
          (rest as any)[`checked${capitalizeFirstLetter(propertyName)}`] ||
          molecularProps.box[`checked${capitalizeFirstLetter(propertyName)}`];
        return checkedProp ? checkedProp : fallbackProp;
      }

      return fallbackProp;
    };

    // RENDER METHODS
    const renderErrorMessage = () => {
      if (rest.errorMessage && rest.isErrorVisible) {
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
          accessibilityState={{ disabled: isDisabled, checked: rest.isChecked }}
          opacity={isDisabled ? 0.5 : 1}
          direction="horizontal"
        >
          <Pressable
            {...molecularProps.box}
            ref={checkboxRef}
            alignSelf="flex-start"
            isDisabled={isDisabled}
            backgroundColor={computeCheckedorErrorProps(
              "backgroundColor",
              molecularProps.box.backgroundColor || molecularProps.box.bg
            )}
            borderRadius={
              shape === "square" ? molecularProps.box.borderRadius : "circle"
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
                : { color: `${colorScheme}.200` }
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
              color={rest.isChecked ? molecularProps.icon.color : "transparent"}
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
