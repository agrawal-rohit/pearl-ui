import React, { useCallback, useMemo, useRef, useState } from "react";
import Box, { BoxProps } from "../../atoms/box/box";
import { buildFontConfig } from "../../atoms/text/text";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import Icon from "../../atoms/icon/icon";
import {
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputChangeEventData,
  TextInputFocusEventData,
  TextInputProps,
} from "react-native";
import {
  StyleFunctionContainer,
  ResponsiveValue,
  PaletteColors,
  MoleculeComponentProps,
  StateProps,
} from "../../../theme/src/types";
import {
  boxStyleFunctions,
  colorStyleFunction,
  createStyleFunction,
  transformColorValue,
  typographyStyleFunction,
} from "../../../theme/src/style-functions";
import { useStyleProps } from "../../../hooks/useStyleProps";
import Pressable from "../../atoms/pressable/pressable";
import { useFocusedState } from "../../../hooks/state/useFocusedState";
import { useDisabledState } from "../../../hooks/state/useDisabledState";
import { useInvalidState } from "../../../hooks/state/useInvalidState";
import { HStack } from "../../atoms/stack/stack";
import { useTheme } from "../../../hooks";
import { InputAtoms } from "./input.config";
import _ from "lodash";

export type InputProps = Omit<
  TextInputProps,
  "placeholderTextColor" | "selectionColor"
> &
  BoxProps &
  StateProps<"_focused" | "_disabled" | "_invalid"> & {
    /**
     * Whether the input field is disabled.
     *
     * @default false
     */
    isDisabled?: boolean;
    /**
     * Whether the input field should span the entire width of the parent container.
     *
     * @default false
     */
    isFullWidth?: boolean;
    /**
     * Whether there the input field is in an invalid state.
     *
     * @default false
     */
    isInvalid?: boolean;
    /**
     * Whether the input field should display a clear button.
     *
     * @default false
     */
    hasClearButton?: boolean;
    /** Icon to display on the left side of the text input */
    leftIcon?: React.ReactElement;
    /** Icon to display on the right side of the text input */
    rightIcon?: React.ReactElement;
    /**
     * Custom color of the placeholder text string.
     *
     * @default "neutral.500"
     */
    placeholderTextColor?: ResponsiveValue<PaletteColors>;
    /**
     * Custom color of the highlight and cursor color.
     *
     * @default "primary.500"
     */
    selectionColor?: ResponsiveValue<PaletteColors>;
  };

// Additional style Functions used for this component
const placeholderTextColorStyleFunction = createStyleFunction({
  property: "placeholderTextColor",
  styleProperty: "placeholderTextColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const selectionColorStyleFunction = createStyleFunction({
  property: "selectionColor",
  styleProperty: "selectionColor",
  themeKey: "palette",
  transform: transformColorValue,
});

const inputRootStyleFunction = [
  ...boxStyleFunctions,
  placeholderTextColorStyleFunction,
  selectionColorStyleFunction,
];

const inputTextStyleFunction = [
  colorStyleFunction,
  typographyStyleFunction,
] as StyleFunctionContainer[];

/** The Input component is a component that is used to get user input in a text field. **/
const Input = React.memo(
  React.forwardRef(
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
        colorScheme = "primary",
        onChangeText = () => {},
        onChange = () => {},
        ...rest
      }: Omit<
        MoleculeComponentProps<"Input", InputProps, InputAtoms>,
        "atoms"
      > & {
        atoms?: InputAtoms;
      },
      textInputRef: any
    ) => {
      const { theme } = useTheme();
      const [isCleared, setIsCleared] = useState(
        rest.value && rest.value.length > 0 ? false : true
      );

      let molecularProps = useMolecularComponentConfig<InputAtoms>(
        "Input",
        rest,
        {
          size: size,
          variant: rest["variant"],
        },
        colorScheme,
        boxStyleFunctions,
        "container",
        "input",
        "container"
      );

      const { atoms } = molecularProps;

      const inputProps = useStyleProps(atoms.input, inputRootStyleFunction);
      const { placeholderTextColor, selectionColor, ...finalInputStyle } =
        inputProps.style;

      const textProps = useAtomicComponentConfig(
        "Text",
        atoms.text,
        {
          size: size,
          variant: atoms.text.variant,
        },
        "primary",
        inputTextStyleFunction
      );

      const memoizedBuildFontConfig = useCallback(
        () =>
          buildFontConfig(
            textProps.style,
            atoms.input.allowFontScaling || true,
            theme
          ),
        [textProps.style, atoms.input.allowFontScaling]
      );

      const finalTextStyles = useMemo(
        () => ({
          ...textProps.style,
          ...memoizedBuildFontConfig(),
        }),
        [textProps.style, memoizedBuildFontConfig]
      );

      // Use State for dynamic styles
      const { focused, setFocused, propsWithFocusedStyles } = useFocusedState(
        atoms.container,
        boxStyleFunctions,
        "molecule"
      );
      atoms.container = propsWithFocusedStyles;
      const { propsWithDisabledStyles } = useDisabledState(
        atoms.container,
        boxStyleFunctions,
        "molecule",
        true,
        isDisabled
      );
      atoms.container = propsWithDisabledStyles;
      const { propsWithInvalidStyles } = useInvalidState(
        atoms.container,
        boxStyleFunctions,
        "molecule",
        true,
        isInvalid
      );
      atoms.container = propsWithInvalidStyles;

      // METHODS
      const clearInputHandler = () => {
        (textInputRef.current as any).clear();
        setIsCleared(true);
        onChangeText("");
      };

      const onChangeHandler = (
        event: NativeSyntheticEvent<TextInputChangeEventData>
      ) => {
        const { text } = event.nativeEvent;
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
        setFocused(true);
        if (onFocus) {
          onFocus(event);
        }
      };

      const blurInputHandler = (
        event: NativeSyntheticEvent<TextInputFocusEventData>
      ) => {
        setFocused(false);
        if (onBlur) {
          onBlur(event);
        }
      };

      // Render Functions
      const renderLeftIcon = useCallback(() => {
        if (leftIcon) {
          return React.cloneElement(leftIcon, {
            ...atoms.icon,
            ...leftIcon.props,
          });
        }
      }, [leftIcon, atoms.icon]);

      const renderRightIcon = useCallback(() => {
        if (rightIcon) {
          return React.cloneElement(rightIcon, {
            ...atoms.icon,
            ...rightIcon.props,
          });
        }
      }, [rightIcon, atoms.icon]);

      const renderClearIcon = useCallback(() => {
        if (hasClearButton && !isCleared) {
          return (
            <Pressable testID="clear-icon" onPress={clearInputHandler}>
              <Icon
                {...atoms.icon}
                iconFamily="Ionicons"
                iconName="close"
                marginLeft="2"
              />
            </Pressable>
          );
        }
      }, [hasClearButton, isCleared, clearInputHandler, atoms.icon]);

      return (
        <Box {...atoms.container} w={isFullWidth ? "100%" : undefined}>
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
            placeholderTextColor={placeholderTextColor ?? "#a7a7a7"}
            selectionColor={selectionColor ?? null}
            accessibilityLabel={rest.accessibilityLabel ?? rest.placeholder}
            accessibilityState={{ disabled: isDisabled, selected: focused }}
            style={[
              finalInputStyle,
              finalTextStyles,
              Platform.OS === "web" ? { outlineStyle: "none" } : {},
              { flex: 1 },
            ]}
          />

          <HStack spacing="0" alignSelf="center" alignItems="center">
            {renderRightIcon()}
            {renderClearIcon()}
          </HStack>
        </Box>
      );
    }
  )
);

Input.displayName = "Input";

export default Input;
