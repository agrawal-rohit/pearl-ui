import React, { useRef, useState } from "react";
import Box, { BoxProps, boxStyleFunctions } from "../../Atoms/Box/Box";
import Text, { buildFontConfig } from "../../Atoms/Text/Text";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import Icon from "../../Atoms/Icon/Icon";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TextInputFocusEventData,
  TextInputProps,
} from "react-native";
import {
  FinalPearlTheme,
  ColorModeColor,
  StyleFunctionContainer,
  ResponsiveValue,
} from "../../../theme/src/types";
import {
  color,
  createStyleFunction,
  transformColorValue,
  typography,
} from "../../../theme/src/styleFunctions";
import { useStyledProps } from "../../../hooks/useStyledProps";
import Pressable from "../../Atoms/Pressable/Pressable";
import { useColorScheme } from "../../../hooks/useColorScheme";

export type InputProps = TextInputProps &
  BoxProps & {
    /** Size of the input field. */
    size?: string;
    /** Variant of the input field. */
    variant?: string;
    /** Whether the input field is disabled.  */
    isDisabled?: boolean;
    /** Whether the input field should span the entire width of the parent container */
    isFullWidth?: boolean;
    /** Whether the input field should display a clear button */
    hasClearButton?: boolean;
    /** Whether there the input field is in an error state */
    isInvalid?: boolean;
    /** Icon to display on the left side of the text input */
    leftIcon?: React.ReactElement;
    /** Icon to display on the right side of the text input */
    rightIcon?: React.ReactElement;
    /** The error message to be displayed if the input field is in an error state */
    errorMessage?: string;
    /** Active color palette of the input field */
    colorScheme?: string;
    /** Custom color of the placeholder text string */
    placeholderTextColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The background color of the input field when it is in focus */
    focusBackgroundColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border color of the input field when it is in focus */
    focusBorderColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border start color of the input field when it is in focus */
    focusBorderStartColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border end color of the input field when it is in focus */
    focusBorderEndColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border top color of the input field when it is in focus */
    focusBorderTopColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border left color of the input field when it is in focus */
    focusBorderLeftColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border right color of the input field when it is in focus */
    focusBorderRightColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border bottom color of the input field when it is in focus */
    focusBorderBottomColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The shadow color of the input field when it is in focus */
    focusShadowColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The background color of the input field when it is in an error state */
    errorBackgroundColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border color of the input field when it is in an error state */
    errorBorderColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border start color of the input field when it is in an error state */
    errorBorderStartColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border end color of the input field when it is in an error state */
    errorBorderEndColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border top color of the input field when it is in an error state */
    errorBorderTopColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border left color of the input field when it is in an error state */
    errorBorderLeftColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border right color of the input field when it is in an error state */
    errorBorderRightColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The border bottom color of the input field when it is in an error state */
    errorBorderBottomColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
    /** The shadow color of the input field when it is in an error state */
    errorShadowColor?: ResponsiveValue<
      keyof FinalPearlTheme["palette"] | ColorModeColor
    >;
  };

// Additional style Functions used for this component
const placeholderTextColorStyleFunction = createStyleFunction({
  property: "placeholderTextColor",
  styleProperty: "placeholderTextColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const focusShadowColorStyleFunction = createStyleFunction({
  property: "focusShadowColor",
  styleProperty: "focusShadowColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const errorShadowColorStyleFunction = createStyleFunction({
  property: "errorShadowColor",
  styleProperty: "errorShadowColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const inputRootStyleFunctions = [
  ...boxStyleFunctions,
  placeholderTextColorStyleFunction,
  focusShadowColorStyleFunction,
  errorShadowColorStyleFunction,
];

const inputTextStyleFunctions = [color, typography] as StyleFunctionContainer[];

/** The Input component is a component that is used to get user input in a text field. **/
const Input = React.forwardRef(
  (
    {
      children,
      onFocus = undefined,
      onBlur = undefined,
      size = "m",
      isDisabled = false,
      isFullWidth = false,
      hasClearButton = false,
      isInvalid = false,
      leftIcon = undefined,
      rightIcon = undefined,
      errorMessage = "",
      colorScheme = "primary",
      onChangeText = () => {},
      onChange = () => {},
      ...rest
    }: InputProps,
    textInputRef: any
  ) => {
    if (!textInputRef) {
      textInputRef = useRef();
    }
    const [isFocused, setIsFocused] = useState(false);
    const [isCleared, setIsCleared] = useState(
      rest.value && rest.value.length > 0 ? false : true
    );

    const {
      focusBackgroundColor,
      focusBorderColor,
      focusBorderStartColor,
      focusBorderEndColor,
      focusBorderTopColor,
      focusBorderLeftColor,
      focusBorderRightColor,
      focusBorderBottomColor,
      errorBackgroundColor,
      errorBorderColor,
      errorBorderStartColor,
      errorBorderEndColor,
      errorBorderTopColor,
      errorBorderLeftColor,
      errorBorderRightColor,
      errorBorderBottomColor,
      ...filteredReceivedProps
    } = rest;

    let molecularProps = useMolecularComponentConfig(
      "Input",
      filteredReceivedProps,
      {
        size: size,
        variant: filteredReceivedProps["variant"],
      },
      colorScheme,
      inputRootStyleFunctions,
      "root",
      "input"
    );

    const inputProps = useStyledProps(
      molecularProps.input,
      inputRootStyleFunctions
    );
    const { placeholderTextColor, ...finalInputStyle } = inputProps.style;

    const textProps = useAtomicComponentConfig(
      "Text",
      molecularProps.text,
      {
        size: size,
        variant: molecularProps.text.variant,
      },
      "primary",
      inputTextStyleFunctions
    );

    const memoizedBuildFontConfig = React.useCallback(
      () =>
        buildFontConfig(textProps.style, molecularProps.input.allowFontScaling),
      [textProps.style, molecularProps.input.allowFontScaling]
    );

    const finalTextStyles = {
      ...textProps.style,
      ...memoizedBuildFontConfig(),
    };

    // METHODS
    const clearInputHandler = () => {
      (textInputRef.current as any).clear();
      setIsCleared(true);
    };

    const onChangeHandler = (
      event: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
      const { eventCount, target, text } = event.nativeEvent;
      if (text.length > 0) {
        setIsCleared(false);
      }

      onChange(event);
    };

    const onChangeTextHandler = (value: string) => {
      if (value.length > 0) {
        setIsCleared(false);
      }

      onChangeText(value);
    };

    const focusInputHandler = (
      event: NativeSyntheticEvent<TextInputFocusEventData>
    ) => {
      setIsFocused(true);
      if (onFocus) {
        onFocus(event);
      }
    };

    const blurInputHandler = (
      event: NativeSyntheticEvent<TextInputFocusEventData>
    ) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(event);
      }
    };

    const capitalizeFirstLetter = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const computeFocusOrErrorProps = (
      propertyName: string,
      customfallbackProp:
        | ResponsiveValue<keyof FinalPearlTheme["palette"] | ColorModeColor>
        | ColorModeColor
        | undefined = undefined,
      targetPropertyParent: object = rest
    ) => {
      let fallbackProp;
      if (customfallbackProp) {
        fallbackProp = customfallbackProp;
      } else {
        fallbackProp = molecularProps.root[propertyName];
      }

      if (isFocused) {
        const focusProp =
          (targetPropertyParent as any)[
            `focus${capitalizeFirstLetter(propertyName)}`
          ] ||
          molecularProps.root[`focus${capitalizeFirstLetter(propertyName)}`];
        return focusProp ? focusProp : fallbackProp;
      }

      if (isInvalid) {
        const errorProp =
          (targetPropertyParent as any)[
            `error${capitalizeFirstLetter(propertyName)}`
          ] ||
          molecularProps.root[`error${capitalizeFirstLetter(propertyName)}`];
        return errorProp ? errorProp : fallbackProp;
      }

      return fallbackProp;
    };

    // Render Functions
    const renderLeftIcon = () => {
      if (leftIcon) {
        return React.cloneElement(leftIcon, {
          ...molecularProps.icon,
          ...leftIcon.props,
        });
      }
    };

    const renderRightIcon = () => {
      if (rightIcon) {
        return React.cloneElement(rightIcon, {
          ...molecularProps.icon,
          ...rightIcon.props,
        });
      }
    };

    const renderClearIcon = () => {
      if (hasClearButton && !isCleared) {
        return (
          <Pressable
            onPress={clearInputHandler}
            activeOpacity={0.8}
            alignSelf="center"
            testID="clear-icon"
          >
            <Icon
              {...molecularProps.icon}
              iconFamily="Ionicons"
              iconName="close"
              marginLeft="xs"
            />
          </Pressable>
        );
      }
    };

    const renderErrorMessage = () => {
      if (errorMessage && isInvalid) {
        return <Text {...molecularProps.errorText}>{errorMessage}</Text>;
      }
    };

    return (
      <>
        <Box
          {...molecularProps.root}
          backgroundColor={computeFocusOrErrorProps(
            "backgroundColor",
            molecularProps.root.backgroundColor || molecularProps.root.bg
          )}
          borderColor={computeFocusOrErrorProps("borderColor")}
          borderStartColor={computeFocusOrErrorProps("borderStartColor")}
          borderEndColor={computeFocusOrErrorProps("borderEndColor")}
          borderTopColor={computeFocusOrErrorProps("borderTopColor")}
          borderBottomColor={computeFocusOrErrorProps("borderBottomColor")}
          borderLeftColor={computeFocusOrErrorProps("borderLeftColor")}
          borderRightColor={computeFocusOrErrorProps("borderRightColor")}
          opacity={isDisabled ? 0.5 : 1}
          testID="inputFieldContainer"
          style={{
            ...molecularProps.root.style,
            shadowColor: computeFocusOrErrorProps(
              "shadowColor",
              molecularProps.root.style.shadowColor,
              molecularProps.root.style
            ),
          }}
        >
          {renderLeftIcon()}
          <TextInput
            {...inputProps}
            ref={textInputRef}
            editable={!isDisabled}
            onFocus={focusInputHandler}
            onBlur={blurInputHandler}
            onChange={onChangeHandler}
            onChangeText={onChangeTextHandler}
            allowFontScaling={true}
            placeholderTextColor={
              molecularProps.root.style.placeholderTextColor ||
              placeholderTextColor
                ? molecularProps.root.style.placeholderTextColor ||
                  placeholderTextColor
                : "#a7a7a7"
            }
            accessibilityLabel={
              rest.accessibilityLabel
                ? rest.accessibilityLabel
                : rest.placeholder
            }
            accessibilityState={{ disabled: isDisabled, selected: isFocused }}
            style={[
              finalInputStyle,
              finalTextStyles,
              { flex: isFullWidth ? 1 : null },
            ]}
          />

          <Box flexDirection="row">
            {renderRightIcon()}
            {renderClearIcon()}
          </Box>
        </Box>
        {renderErrorMessage()}
      </>
    );
  }
);

export default Input;
