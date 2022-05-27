import React, { useRef, useState } from "react";
import Box, { BoxProps } from "../../Atoms/Box/Box";
import Text, { buildFontConfig } from "../../Atoms/Text/Text";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import Icon from "../../Atoms/Icon/Icon";
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
  ColorScheme,
  PaletteColors,
  ComponentSizes,
  ComponentVariants,
  MoleculeComponentProps,
  StateProps,
} from "../../../theme/src/types";
import {
  boxStyleFunctions,
  colorStyleFunction,
  createStyleFunction,
  transformColorValue,
  typographyStyleFunction,
} from "../../../theme/src/styleFunctions";
import { useStyleProps } from "../../../hooks/useStyleProps";
import Pressable from "../../Atoms/Pressable/Pressable";
import _ from "lodash";
import { useFocusedState } from "../../../hooks/stateHooks/useFocusedState";
import { useDisabledState } from "../../../hooks/stateHooks/useDisabledState";
import { useInvalidState } from "../../../hooks/stateHooks/useInvalidState";

export type InputProps = Omit<
  TextInputProps,
  "placeholderTextColor" | "selectionColor"
> &
  BoxProps &
  StateProps<"_focused" | "_disabled" | "_invalid"> & {
    /** Size of the input field. */
    size?: ResponsiveValue<ComponentSizes<"Input">>;
    /** Variant of the input field. */
    variant?: ResponsiveValue<ComponentVariants<"Input">>;
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
    /** Active color palette of the input field */
    colorScheme?: ColorScheme;
    /** Custom color of the placeholder text string */
    placeholderTextColor?: ResponsiveValue<PaletteColors>;
    /** Custom color of the highlight and cursor color */
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

const inputRootStyleFunctions = [
  ...boxStyleFunctions,
  placeholderTextColorStyleFunction,
  selectionColorStyleFunction,
];

const inputTextStyleFunctions = [
  colorStyleFunction,
  typographyStyleFunction,
] as StyleFunctionContainer[];

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
      colorScheme = "primary",
      onChangeText = () => {},
      onChange = () => {},
      ...rest
    }: Omit<MoleculeComponentProps<"Input", InputProps>, "atoms"> & {
      atoms?: Record<string, any>;
    },
    textInputRef: any
  ) => {
    if (!textInputRef) {
      textInputRef = useRef();
    }

    const [isCleared, setIsCleared] = useState(
      rest.value && rest.value.length > 0 ? false : true
    );

    let molecularProps = useMolecularComponentConfig(
      "Input",
      rest,
      {
        size: size,
        variant: rest["variant"],
      },
      colorScheme,
      boxStyleFunctions,
      "root",
      "input"
    );

    let { atoms, ...rootProps } = molecularProps;

    // Transfer the Moti animation props from the 'input' atom props to 'root' props
    rootProps.animate = atoms.input.animate;
    rootProps.from = atoms.input.from;
    rootProps.transition = atoms.input.transition;
    rootProps.delay = atoms.input.delay;
    rootProps.state = atoms.input.state;
    rootProps.stylePriority = atoms.input.stylePriority;
    rootProps.onDidAnimate = atoms.input.onDidAnimate;
    rootProps.exit = atoms.input.exit;
    rootProps.exitTransition = atoms.input.exitTransition;
    rootProps.animateInitialState = atoms.input.animateInitialState;
    rootProps._focused = atoms.input._focused;
    rootProps._disabled = atoms.input._disabled;
    rootProps._invalid = atoms.input._invalid;

    atoms.input = _.omit(atoms.input, [
      "animate",
      "from",
      "transition",
      "delay",
      "_focused",
      "_disabled",
      "_invalid",
      "state",
      "stylePriority",
      "onDidAnimate",
      "exit",
      "exitTransition",
      "animateInitialState",
    ]);

    const inputProps = useStyleProps(atoms.input, inputRootStyleFunctions);
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
      inputTextStyleFunctions
    );

    const memoizedBuildFontConfig = React.useCallback(
      () => buildFontConfig(textProps.style, atoms.input.allowFontScaling),
      [textProps.style, atoms.input.allowFontScaling]
    );

    const finalTextStyles = {
      ...textProps.style,
      ...memoizedBuildFontConfig(),
    };

    // Use State for dynamic styles
    const { focused, setFocused, propsWithFocusedStyles } = useFocusedState(
      rootProps,
      boxStyleFunctions,
      "molecule"
    );
    rootProps = propsWithFocusedStyles;
    const { propsWithDisabledStyles } = useDisabledState(
      rootProps,
      boxStyleFunctions,
      "molecule",
      true,
      isDisabled
    );
    rootProps = propsWithDisabledStyles;
    const { propsWithInvalidStyles } = useInvalidState(
      rootProps,
      boxStyleFunctions,
      "molecule",
      true,
      isInvalid
    );
    rootProps = propsWithInvalidStyles;

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
    const renderLeftIcon = () => {
      if (leftIcon) {
        return React.cloneElement(leftIcon, {
          ...atoms.icon,
          ...leftIcon.props,
        });
      }
    };

    const renderRightIcon = () => {
      if (rightIcon) {
        return React.cloneElement(rightIcon, {
          ...atoms.icon,
          ...rightIcon.props,
        });
      }
    };

    const renderClearIcon = () => {
      if (hasClearButton && !isCleared) {
        return (
          <Pressable
            onPress={clearInputHandler}
            alignSelf="center"
            testID="clear-icon"
          >
            <Icon
              {...atoms.icon}
              iconFamily="Ionicons"
              iconName="close"
              marginLeft="xs"
            />
          </Pressable>
        );
      }
    };

    return (
      <Box {...rootProps}>
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
            rootProps.style.placeholderTextColor || placeholderTextColor
              ? rootProps.style.placeholderTextColor || placeholderTextColor
              : "#a7a7a7"
          }
          selectionColor={
            rootProps.style.selectionColor || selectionColor
              ? rootProps.style.selectionColor || selectionColor
              : null
          }
          accessibilityLabel={
            rest.accessibilityLabel ? rest.accessibilityLabel : rest.placeholder
          }
          accessibilityState={{ disabled: isDisabled, selected: focused }}
          style={[
            finalInputStyle,
            finalTextStyles,
            { flex: isFullWidth ? 1 : null },
            Platform.OS === "web" && { outlineStyle: "none" },
          ]}
        />

        <Box flexDirection="row">
          {renderRightIcon()}
          {renderClearIcon()}
        </Box>
      </Box>
    );
  }
);

export default Input;
