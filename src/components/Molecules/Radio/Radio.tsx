import React from "react";
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
import Pressable, { PressableProps } from "../../Atoms/Pressable/Pressable";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { useColorScheme } from "../../../hooks/useColorScheme";
import Stack from "../../Atoms/Stack/Stack";
import Box, { boxStyleFunctions } from "../../Atoms/Box/Box";
import { useRadioGroup } from "./RadioGroup";
import { GestureResponderEvent } from "react-native";

export type RadioProps = PressableProps & {
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
  /** The error message to be displayed if the radio is in an error state */
  errorMessage?: string;
  /** Active color palette of the radio */
  colorScheme?: ColorScheme;
  /** The spacing between the radio and the label text */
  spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
  /** The background color of the radio's outer box when it is in checked state */
  checkedBackgroundColor?: ResponsiveValue<PaletteColors>;
  /** The border color of the radio's outer box when it is in checked state */
  checkedBorderColor?: ResponsiveValue<PaletteColors>;
  /** The border start color of the radio's outer box when it is in checked state */
  checkedBorderStartColor?: ResponsiveValue<PaletteColors>;
  /** The border end color of the radio's outer box when it is in checked state */
  checkedBorderEndColor?: ResponsiveValue<PaletteColors>;
  /** The border top color of the radio's outer box when it is in checked state */
  checkedBorderTopColor?: ResponsiveValue<PaletteColors>;
  /** The border left color of the radio's outer box when it is in checked state */
  checkedBorderLeftColor?: ResponsiveValue<PaletteColors>;
  /** The border right color of the radio's outer box when it is in checked state */
  checkedBorderRightColor?: ResponsiveValue<PaletteColors>;
  /** The border bottom color of the radio's outer box when it is in checked state */
  checkedBorderBottomColor?: ResponsiveValue<PaletteColors>;
  /** The background color of the radio's outer box when it is in an error state */
  errorBackgroundColor?: ResponsiveValue<PaletteColors>;
  /** The border color of the radio's outer box when it is in an error state */
  errorBorderColor?: ResponsiveValue<PaletteColors>;
  /** The border start color of the radio's outer box when it is in an error state */
  errorBorderStartColor?: ResponsiveValue<PaletteColors>;
  /** The border end color of the radio's outer box when it is in an error state */
  errorBorderEndColor?: ResponsiveValue<PaletteColors>;
  /** The border top color of the radio's outer box when it is in an error state */
  errorBorderTopColor?: ResponsiveValue<PaletteColors>;
  /** The border left color of the radio's outer box when it is in an error state */
  errorBorderLeftColor?: ResponsiveValue<PaletteColors>;
  /** The border right color of the radio's outer box when it is in an error state */
  errorBorderRightColor?: ResponsiveValue<PaletteColors>;
  /** The border bottom color of the radio's outer box when it is in an error state */
  errorBorderBottomColor?: ResponsiveValue<PaletteColors>;
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

    // Overwrite props from radio group
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
      rest.colorScheme,
      boxStyleFunctions,
      "root",
      "outerBox"
    );

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
        | ResponsiveValue<keyof FinalPearlTheme["palette"] | ColorModeColor>
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
