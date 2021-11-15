import React from "react";
import Text from "../../Atoms/Text/Text";
import { BasePearlTheme, ColorModeColor } from "../../../theme/src/types";
import Pressable, { PressableProps } from "../../Atoms/Pressable/Pressable";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { useColorScheme } from "../../../hooks/useColorScheme";
import Stack from "../../Atoms/Stack/Stack";
import Box, { boxStyleFunctions } from "../../Atoms/Box/Box";
import { useRadioGroup } from "./RadioGroup";
import { GestureResponderEvent } from "react-native";

export type RadioProps = PressableProps & {
  /** Size of the radio. */
  size?: string;
  /** Variant of the radio. */
  variant?: string;
  /** Value of the radio if it is part of a group. */
  value?: string | number | undefined;
  /** Whether the radio is disabled.  */
  isDisabled?: boolean;
  /** Whether the radio is in a checked state.  */
  isChecked?: boolean;
  /** Whether the radio is in an error state.  */
  isInvalid?: boolean;
  /** The error message to be displayed if the radio is in an error state */
  errorMessage?: string;
  /** Active color palette of the radio */
  colorScheme?: string;
  /** The spacing between the radio and the label text */
  spacing?: keyof BasePearlTheme["spacing"];
  /** The background color of the radio's outer box when it is in checked state */
  checkedBackgroundColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border color of the radio's outer box when it is in checked state */
  checkedBorderColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border start color of the radio's outer box when it is in checked state */
  checkedBorderStartColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border end color of the radio's outer box when it is in checked state */
  checkedBorderEndColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border top color of the radio's outer box when it is in checked state */
  checkedBorderTopColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border left color of the radio's outer box when it is in checked state */
  checkedBorderLeftColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border right color of the radio's outer box when it is in checked state */
  checkedBorderRightColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border bottom color of the radio's outer box when it is in checked state */
  checkedBorderBottomColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The background color of the radio's outer box when it is in an error state */
  errorBackgroundColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border color of the radio's outer box when it is in an error state */
  errorBorderColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border start color of the radio's outer box when it is in an error state */
  errorBorderStartColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border end color of the radio's outer box when it is in an error state */
  errorBorderEndColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border top color of the radio's outer box when it is in an error state */
  errorBorderTopColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border left color of the radio's outer box when it is in an error state */
  errorBorderLeftColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border right color of the radio's outer box when it is in an error state */
  errorBorderRightColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The border bottom color of the radio's outer box when it is in an error state */
  errorBorderBottomColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
};

/** The Radio component is used when only one choice may be selected in a series of options. **/
const Radio = React.forwardRef(
  ({ children, onPress = () => {}, ...rest }: RadioProps, radioRef: any) => {
    let {
      size,
      variant,
      isDisabled,
      colorScheme,
      radioGroupValue,
      setRadioGroupValue,
    } = useRadioGroup();

    // Overwrite props from checkbox group
    rest.size = size || rest.size;
    rest.variant = variant || rest.variant;
    rest.isDisabled = isDisabled || rest.isDisabled || false;
    rest.colorScheme = colorScheme || rest.colorScheme || "primary";

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
      boxStyleFunctions,
      "root",
      "outerBox"
    );
    molecularProps = useColorScheme(rest.colorScheme, molecularProps);

    // OTHER METHODS
    const radioPressHandler = (event: GestureResponderEvent) => {
      if (isRadioInGroup) {
        setRadioGroupValue(rest.value);
        if (onPress) onPress(event);
      }
      if (onPress) onPress(event);
    };

    const capitalizeFirstLetter = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const computeCheckedorErrorProps = (
      propertyName: string,
      boxType: "outer" | "inner",
      customfallbackProp:
        | keyof BasePearlTheme["palette"]
        | ColorModeColor
        | undefined = undefined
    ) => {
      let fallbackProp;
      if (customfallbackProp) {
        fallbackProp = customfallbackProp;
      } else {
        fallbackProp = molecularProps[`${boxType}Box`][propertyName];
      }

      if (rest.isInvalid) {
        const checkedProp =
          (rest as any)[`error${capitalizeFirstLetter(propertyName)}`] ||
          molecularProps[`${boxType}Box`][
            `error${capitalizeFirstLetter(propertyName)}`
          ];
        return checkedProp ? checkedProp : fallbackProp;
      }

      if (isRadioChecked) {
        const delectedProp =
          (rest as any)[`checked${capitalizeFirstLetter(propertyName)}`] ||
          molecularProps[`${boxType}Box`][
            `checked${capitalizeFirstLetter(propertyName)}`
          ];

        return delectedProp ? delectedProp : fallbackProp;
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
          alignSelf="flex-start"
          direction="horizontal"
          spacing={rest.spacing || molecularProps.root.spacing}
        >
          <Pressable
            {...molecularProps.outerBox}
            ref={radioRef}
            onPress={radioPressHandler}
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
            isDisabled={rest.isDisabled}
            backgroundColor={computeCheckedorErrorProps(
              "backgroundColor",
              "outer",
              molecularProps.outerBox.backgroundColor ||
                molecularProps.outerBox.bg
            )}
            borderColor={computeCheckedorErrorProps("borderColor", "outer")}
            borderStartColor={computeCheckedorErrorProps(
              "borderStartColor",
              "outer"
            )}
            borderEndColor={computeCheckedorErrorProps(
              "borderEndColor",
              "outer"
            )}
            borderTopColor={computeCheckedorErrorProps(
              "borderTopColor",
              "outer"
            )}
            borderLeftColor={computeCheckedorErrorProps(
              "borderLeftColor",
              "outer"
            )}
            borderRightColor={computeCheckedorErrorProps(
              "borderRightColor",
              "outer"
            )}
            borderBottomColor={computeCheckedorErrorProps(
              "borderBottomColor",
              "outer"
            )}
            androidRippleConfig={
              rest.androidRippleConfig
                ? rest.androidRippleConfig
                : { color: `${rest.colorScheme}.200` }
            }
          >
            <Box
              {...molecularProps.innerBox}
              width="100%"
              height="100%"
              backgroundColor={computeCheckedorErrorProps(
                "backgroundColor",
                "inner",
                molecularProps.innerBox.backgroundColor ||
                  molecularProps.innerBox.bg
              )}
              borderColor={computeCheckedorErrorProps("borderColor", "inner")}
              borderStartColor={computeCheckedorErrorProps(
                "borderStartColor",
                "inner"
              )}
              borderEndColor={computeCheckedorErrorProps(
                "borderEndColor",
                "inner"
              )}
              borderTopColor={computeCheckedorErrorProps(
                "borderTopColor",
                "inner"
              )}
              borderLeftColor={computeCheckedorErrorProps(
                "borderLeftColor",
                "inner"
              )}
              borderRightColor={computeCheckedorErrorProps(
                "borderRightColor",
                "inner"
              )}
              borderBottomColor={computeCheckedorErrorProps(
                "borderBottomColor",
                "inner"
              )}
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

export default Radio;
