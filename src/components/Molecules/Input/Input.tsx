import React, { useRef, useState } from "react";
import Box, { BoxProps, boxStyleFunctions } from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
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
  BasePearlTheme,
  ColorModeColor,
  StyleFunctionContainer,
} from "../../../theme/src/types";
import {
  color,
  createStyleFunction,
  transformColorValue,
  typography,
} from "../../../theme/src/styleFunctions";
import { useStyledProps } from "../../../hooks/useStyledProps";
import Pressable from "../../Atoms/Pressable/Pressable";

type InputProps = TextInputProps &
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
    isErrorVisible?: boolean;
    /** Icon to display on the left side of the main text */
    leftIcon?: React.ReactElement;
    /** Icon to display on the right side of the main text */
    rightIcon?: React.ReactElement;
    /** The error message to be displayed if the input field is in an error state */
    errorMessage?: string;
    /** The text color of the placeholder string */
    placeholderTextColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The background color of the input field when it is in focus */
    focusBackgroundColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border color of the input field when it is in focus */
    focusBorderColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border start color of the input field when it is in focus */
    focusBorderStartColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border end color of the input field when it is in focus */
    focusBorderEndColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border top color of the input field when it is in focus */
    focusBorderTopColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border left color of the input field when it is in focus */
    focusBorderLeftColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border right color of the input field when it is in focus */
    focusBorderRightColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border bottom color of the input field when it is in focus */
    focusBorderBottomColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The shadow color of the input field when it is in focus */
    focusShadowColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The background color of the input field when it is in an error state */
    errorBackgroundColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border color of the input field when it is in an error state */
    errorBorderColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border start color of the input field when it is in an error state */
    errorBorderStartColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border end color of the input field when it is in an error state */
    errorBorderEndColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border top color of the input field when it is in an error state */
    errorBorderTopColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border left color of the input field when it is in an error state */
    errorBorderLeftColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border right color of the input field when it is in an error state */
    errorBorderRightColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The border bottom color of the input field when it is in an error state */
    errorBorderBottomColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
    /** The shadow color of the input field when it is in an error state */
    errorShadowColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  };

// Additional style Functions used for this component
const placeholderTextColorStyleFunction = createStyleFunction({
  property: "placeholderTextColor",
  styleProperty: "placeholderTextColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const focusBackgroundColorStyleFunction = createStyleFunction({
  property: "focusBackgroundColor",
  styleProperty: "focusBackgroundColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const focusBorderColorStyleFunction = createStyleFunction({
  property: "focusBorderColor",
  styleProperty: "focusBorderColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const focusBorderStartColorStyleFunction = createStyleFunction({
  property: "focusBorderStartColor",
  styleProperty: "focusBorderStartColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const focusBorderEndColorStyleFunction = createStyleFunction({
  property: "focusBorderEndColor",
  styleProperty: "focusBorderEndColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const focusBorderTopColorStyleFunction = createStyleFunction({
  property: "focusBorderTopColor",
  styleProperty: "focusBorderTopColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const focusBorderLeftColorStyleFunction = createStyleFunction({
  property: "focusBorderLeftColor",
  styleProperty: "focusBorderLeftColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const focusBorderRightColorStyleFunction = createStyleFunction({
  property: "focusBorderRightColor",
  styleProperty: "focusBorderRightColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const focusBorderBottomColorStyleFunction = createStyleFunction({
  property: "focusBorderBottomColor",
  styleProperty: "focusBorderBottomColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const focusShadowColorStyleFunction = createStyleFunction({
  property: "focusShadowColor",
  styleProperty: "focusShadowColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const errorBackgroundColorStyleFunction = createStyleFunction({
  property: "errorBackgroundColor",
  styleProperty: "errorBackgroundColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const errorBorderColorStyleFunction = createStyleFunction({
  property: "errorBorderColor",
  styleProperty: "errorBorderColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const errorBorderStartColorStyleFunction = createStyleFunction({
  property: "errorBorderStartColor",
  styleProperty: "errorBorderStartColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const errorBorderEndColorStyleFunction = createStyleFunction({
  property: "errorBorderEndColor",
  styleProperty: "errorBorderEndColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const errorBorderTopColorStyleFunction = createStyleFunction({
  property: "errorBorderTopColor",
  styleProperty: "errorBorderTopColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const errorBorderLeftColorStyleFunction = createStyleFunction({
  property: "errorBorderLeftColor",
  styleProperty: "errorBorderLeftColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const errorBorderRightColorStyleFunction = createStyleFunction({
  property: "errorBorderRightColor",
  styleProperty: "errorBorderRightColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const errorBorderBottomColorStyleFunction = createStyleFunction({
  property: "errorBorderBottomColor",
  styleProperty: "errorBorderBottomColor",
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
  focusBackgroundColorStyleFunction,
  focusBorderColorStyleFunction,
  focusBorderEndColorStyleFunction,
  focusBorderStartColorStyleFunction,
  focusBorderTopColorStyleFunction,
  focusBorderLeftColorStyleFunction,
  focusBorderRightColorStyleFunction,
  focusBorderBottomColorStyleFunction,
  focusShadowColorStyleFunction,
  errorBackgroundColorStyleFunction,
  errorBorderColorStyleFunction,
  errorBorderStartColorStyleFunction,
  errorBorderEndColorStyleFunction,
  errorBorderTopColorStyleFunction,
  errorBorderLeftColorStyleFunction,
  errorBorderRightColorStyleFunction,
  errorBorderBottomColorStyleFunction,
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
      isErrorVisible = false,
      leftIcon = undefined,
      rightIcon = undefined,
      errorMessage = "",
      onChangeText = () => {},
      onChange = () => {},
      ...props
    }: InputProps,
    textInputRef: any
  ) => {
    if (!textInputRef) {
      textInputRef = useRef();
    }
    const [isFocused, setIsFocused] = useState(false);
    const [isCleared, setIsCleared] = useState(
      props.value && props.value.length > 0 ? false : true
    );

    let multiComponentStyles = useMolecularComponentConfig(
      "Input",
      props,
      {
        size: size,
        variant: props["variant"],
      },
      inputRootStyleFunctions,
      "root",
      "input"
    );

    const inputProps = useStyledProps(
      multiComponentStyles.input,
      inputRootStyleFunctions
    );
    const { placeholderTextColor, ...finalInputStyle } = inputProps.style;

    const textStyles = useAtomicComponentConfig(
      "Text",
      multiComponentStyles.text,
      {
        size: size,
        variant: multiComponentStyles.text.variant,
      },
      inputTextStyleFunctions
    );

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
        | keyof BasePearlTheme["palette"]
        | ColorModeColor
        | undefined = undefined
    ) => {
      let fallbackProp;
      if (customfallbackProp) {
        fallbackProp = customfallbackProp;
      } else {
        fallbackProp = multiComponentStyles.root[propertyName];
      }

      if (isFocused) {
        const focusProp =
          multiComponentStyles.root[
            `focus${capitalizeFirstLetter(propertyName)}`
          ];
        return focusProp ? focusProp : fallbackProp;
      }

      if (isErrorVisible) {
        const errorProp =
          multiComponentStyles.root[
            `error${capitalizeFirstLetter(propertyName)}`
          ];
        return errorProp ? errorProp : fallbackProp;
      }

      return fallbackProp;
    };

    // Render Functions
    const renderLeftIcon = () => {
      if (leftIcon) {
        return React.cloneElement(leftIcon, {
          ...multiComponentStyles.icon,
          ...leftIcon.props,
        });
      }
    };

    const renderRightIcon = () => {
      if (rightIcon) {
        return React.cloneElement(rightIcon, {
          ...multiComponentStyles.icon,
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
              {...multiComponentStyles.icon}
              iconFamily="Ionicons"
              iconName="close"
              marginLeft="xs"
            />
          </Pressable>
        );
      }
    };

    const renderErrorMessage = () => {
      if (errorMessage && isErrorVisible) {
        return <Text {...multiComponentStyles.errorText}>{errorMessage}</Text>;
      }
    };

    return (
      <>
        <Box
          {...multiComponentStyles.root}
          backgroundColor={computeFocusOrErrorProps(
            "backgroundColor",
            multiComponentStyles.root.backgroundColor ||
              multiComponentStyles.root.bg
          )}
          borderColor={computeFocusOrErrorProps("borderColor")}
          borderStartColor={computeFocusOrErrorProps("borderStartColor")}
          borderEndColor={computeFocusOrErrorProps("borderEndColor")}
          borderTopColor={computeFocusOrErrorProps("borderTopColor")}
          borderBottomColor={computeFocusOrErrorProps("borderBottomColor")}
          borderLeftColor={computeFocusOrErrorProps("borderLeftColor")}
          borderRightColor={computeFocusOrErrorProps("borderRightColor")}
          shadowColor={computeFocusOrErrorProps("shadowColor")}
          opacity={isDisabled ? 0.5 : 1}
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
              placeholderTextColor ? placeholderTextColor : "#a7a7a7"
            }
            accessibilityLabel={
              props.accessibilityLabel
                ? props.accessibilityLabel
                : props.placeholder
            }
            accessibilityState={{ disabled: isDisabled, selected: isFocused }}
            style={[
              finalInputStyle,
              textStyles.style,
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
