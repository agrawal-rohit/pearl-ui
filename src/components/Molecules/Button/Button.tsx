import React from "react";
import Spinner from "../../Atoms/Spinner/Spinner";
import Box, { BoxProps } from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import Icon from "../../Atoms/Icon/Icon";
import { useColorScheme } from "../../../hooks/useColorScheme";
import Pressable, { PressableProps } from "../../Atoms/Pressable/Pressable";

export type ButtonProps = PressableProps & {
  /** Size of the button. */
  size?: string;
  /** Variant of the button. */
  variant?: string;
  /** Whether the button is in a loading state.  */
  isLoading?: boolean;
  /** Whether the button should span the entire width of the parent container */
  isFullWidth?: boolean;
  /** The text value to display when the button is in a loading state */
  loadingText?: string;
  /** Active color palette of the button */
  colorScheme?: string;
  /** The position of the loading spinner with respect to the loadingText */
  spinnerPlacement?: "start" | "end";
  /** Icon to display on the left side of the main text */
  leftIcon?: React.ReactElement;
  /** Icon to display on the right side of the main text */
  rightIcon?: React.ReactElement;
};

/** Button is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation */
const Button: React.FC<ButtonProps> = ({
  children,
  loadingText = null,
  colorScheme = "primary",
  spinnerPlacement = "start",
  isLoading = false,
  isFullWidth = false,
  isDisabled = false,
  leftIcon = null,
  rightIcon = null,
  ...rest
}) => {
  let molecularProps = useMolecularComponentConfig("Button", rest, {
    size: rest["size"],
    variant: rest["variant"],
  });
  molecularProps = useColorScheme(colorScheme, molecularProps);

  const disabled = isDisabled ? true : isLoading;

  const renderLoadingStatus = () => {
    if (loadingText) {
      return (
        <Box alignItems="center" flexDirection="row">
          {spinnerPlacement === "start" ? (
            <>
              <Spinner {...molecularProps.spinner} />
              <Text
                marginLeft={molecularProps.root.py}
                {...molecularProps.text}
              >
                {loadingText}
              </Text>
            </>
          ) : (
            <>
              <Text
                marginRight={molecularProps.root.py}
                {...molecularProps.text}
              >
                {loadingText}
              </Text>

              <Spinner {...molecularProps.spinner} />
            </>
          )}
        </Box>
      );
    } else {
      return (
        <>
          <Spinner
            style={{ position: "absolute" }}
            {...molecularProps.spinner}
          />
          <Text {...molecularProps.text} color="transparent">
            {children}
          </Text>
        </>
      );
    }
  };

  const renderMainContent = () => {
    if (leftIcon || rightIcon) {
      return (
        <Box flexDirection="row">
          {leftIcon
            ? React.cloneElement(leftIcon, {
                ...molecularProps.icon,
                marginRight:
                  molecularProps.root.py || molecularProps.root.paddingVertical,
                ...leftIcon.props,
              })
            : null}
          <Text {...molecularProps.text}>{children}</Text>
          {rightIcon
            ? React.cloneElement(rightIcon, {
                ...molecularProps.icon,
                marginLeft:
                  molecularProps.root.py || molecularProps.root.paddingVertical,
                ...rightIcon.props,
              })
            : null}
        </Box>
      );
    } else {
      return <Text {...molecularProps.text}>{children}</Text>;
    }
  };

  return (
    <Pressable
      {...molecularProps.root}
      isDisabled={disabled}
      opacity={disabled ? 0.5 : 1}
      onPress={rest.onPress}
      alignSelf={isFullWidth ? "stretch" : "flex-start"}
      androidRippleConfig={
        rest.androidRippleConfig
          ? rest.androidRippleConfig
          : { color: `${colorScheme}.200` }
      }
      accessibilityLabel={
        !isLoading
          ? rest.accessibilityLabel
            ? rest.accessibilityLabel
            : children
          : "Loading"
      }
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
    >
      {isLoading ? renderLoadingStatus() : renderMainContent()}
    </Pressable>
  );
};

export default Button;
