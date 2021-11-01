import React, { useRef, useState } from "react";
import Box, { boxStyleFunctions } from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import Icon from "../../Atoms/Icon/Icon";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputComponent,
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

type InputProps = TextInputProps & {
  /** Size of the input field. */
  size?: string;
  /** Variant of the input field. */
  variant?: string;
  /** Whether the input field is disabled.  */
  isDisabled?: boolean;
  /** Whether the input field is in a loading state.  */
  isLoading?: boolean;
  /** Whether the input field should span the entire width of the parent container */
  isFullWidth?: boolean;
  /** Whether the input field should display a clear button */
  hasClearButton?: boolean;
  /** Icon to display on the left side of the main text */
  leftIcon?: React.ReactElement;
  /** Icon to display on the right side of the main text */
  rightIcon?: React.ReactElement;
  /** Whether there the input field is in an error state */
  errorVisible?: boolean;
  /** The error message to be displayed if the input field is in an error state */
  errorMessage?: string;
  /** The text color of the placeholder string */
  placeholderTextColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
  /** The background color of the input field when it is in focus */
  focusBackgroundColor?: keyof BasePearlTheme["palette"] | ColorModeColor;
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

boxStyleFunctions.push(placeholderTextColorStyleFunction);
boxStyleFunctions.push(focusBackgroundColorStyleFunction);
boxStyleFunctions.push(focusBorderColorStyleFunction);
boxStyleFunctions.push(focusBorderEndColorStyleFunction);
boxStyleFunctions.push(focusBorderStartColorStyleFunction);
boxStyleFunctions.push(focusBorderTopColorStyleFunction);
boxStyleFunctions.push(focusBorderLeftColorStyleFunction);
boxStyleFunctions.push(focusBorderRightColorStyleFunction);
boxStyleFunctions.push(focusBorderBottomColorStyleFunction);
boxStyleFunctions.push(focusShadowColorStyleFunction);

const inputTextStyleFunctions = [color, typography] as StyleFunctionContainer[];

/** The Input component is a component that is used to get user input in a text field. **/
const Input: React.FC<InputProps> = ({
  children,
  onFocus = undefined,
  onBlur = undefined,
  size = "m",
  isDisabled = false,
  isLoading = false,
  isFullWidth = false,
  hasClearButton = false,
  leftIcon = undefined,
  rightIcon = undefined,
  errorVisible = false,
  errorMessage = "",
  ...props
}) => {
  const textInputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  let multiComponentStyles = useMolecularComponentConfig(
    "Input",
    props,
    {
      size: size,
      variant: props["variant"],
    },
    boxStyleFunctions,
    "root",
    "input"
  );

  const inputProps = useStyledProps(
    multiComponentStyles.input,
    boxStyleFunctions
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
  };

  const focusInputHandler = (
    e: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const blurInputHandler = (
    e: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const computeFocusedProps = (
    focusProp: keyof BasePearlTheme["palette"] | ColorModeColor,
    fallbackProp: keyof BasePearlTheme["palette"] | ColorModeColor
  ) => {
    return isFocused ? (focusProp ? focusProp : fallbackProp) : fallbackProp;
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
      return (
        <Box flexDirection="row">
          {React.cloneElement(rightIcon, {
            ...multiComponentStyles.icon,
            ...rightIcon.props,
          })}

          {hasClearButton && props.value && props.value.length > 0 && (
            <Pressable
              onPress={clearInputHandler}
              activeOpacity={0.8}
              alignSelf="center"
            >
              <Icon
                iconFamily="Ionicons"
                iconName="close"
                marginLeft="xs"
                {...multiComponentStyles.icon}
              />
            </Pressable>
          )}
        </Box>
      );
    }
  };

  const renderErrorMessage = () => {
    if (errorMessage && errorVisible) {
      return <Text variant="caption">{errorMessage}</Text>;
    }
  };
  return (
    <>
      <Box
        {...multiComponentStyles.root}
        backgroundColor={computeFocusedProps(
          multiComponentStyles.root.focusBackgroundColor,
          multiComponentStyles.root.backgroundColor ||
            multiComponentStyles.root.bg
        )}
        borderColor={computeFocusedProps(
          multiComponentStyles.root.focusBorderColor,
          multiComponentStyles.root.borderColor
        )}
        borderStartColor={computeFocusedProps(
          multiComponentStyles.root.focusBorderStartColor,
          multiComponentStyles.root.borderStartColor
        )}
        borderEndColor={computeFocusedProps(
          multiComponentStyles.root.focusBorderEndColor,
          multiComponentStyles.root.borderEndColor
        )}
        borderTopColor={computeFocusedProps(
          multiComponentStyles.root.focusBorderTopColor,
          multiComponentStyles.root.borderTopColor
        )}
        borderBottomColor={computeFocusedProps(
          multiComponentStyles.root.focusBorderBottomColor,
          multiComponentStyles.root.borderBottomColor
        )}
        borderLeftColor={computeFocusedProps(
          multiComponentStyles.root.focusBorderLeftColor,
          multiComponentStyles.root.borderLeftColor
        )}
        borderRightColor={computeFocusedProps(
          multiComponentStyles.root.focusBorderRightColor,
          multiComponentStyles.root.borderRightColor
        )}
        shadowColor={computeFocusedProps(
          multiComponentStyles.root.focusShadowColor,
          multiComponentStyles.root.shadowColor
        )}
      >
        {renderLeftIcon()}
        <TextInput
          ref={textInputRef}
          onFocus={focusInputHandler}
          onBlur={blurInputHandler}
          allowFontScaling={true}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : "#a7a7a7"
          }
          {...inputProps}
          style={[
            finalInputStyle,
            textStyles.style,
            { flex: isFullWidth ? 1 : "auto" },
          ]}
        />
        {renderRightIcon()}
      </Box>
      {renderErrorMessage()}
    </>
  );
};

export default Input;
