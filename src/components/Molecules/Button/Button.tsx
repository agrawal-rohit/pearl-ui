import React from "react";
import Spinner from "../../Atoms/Spinner/Spinner";
import Box, { BoxProps } from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import Icon from "../../Atoms/Icon/Icon";
import { useColorScheme } from "../../../hooks/useColorScheme";
import Pressable, { PressableProps } from "../../Atoms/Pressable/Pressable";

type ButtonProps = PressableProps & {
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
  ...props
}) => {
  let multiComponentStyles = useMolecularComponentConfig("Button", props, {
    size: props["size"],
    variant: props["variant"],
  });
  if (colorScheme !== "primary") {
    multiComponentStyles = useColorScheme(colorScheme, multiComponentStyles);
  }

  const leftIconProps = leftIcon
    ? { ...multiComponentStyles.icon, ...leftIcon.props }
    : {};

  const rightIconProps = rightIcon
    ? { ...multiComponentStyles.icon, ...rightIcon.props }
    : {};

  const disabled = isDisabled ? true : isLoading;

  const renderLoadingStatus = () => {
    if (loadingText) {
      return (
        <Box alignItems="center" flexDirection="row">
          {spinnerPlacement === "start" ? (
            <>
              <Spinner {...multiComponentStyles.spinner} />
              <Text
                marginLeft={multiComponentStyles.root.py}
                {...multiComponentStyles.text}
              >
                {loadingText}
              </Text>
            </>
          ) : (
            <>
              <Text
                marginRight={multiComponentStyles.root.py}
                {...multiComponentStyles.text}
              >
                {loadingText}
              </Text>

              <Spinner {...multiComponentStyles.spinner} />
            </>
          )}
        </Box>
      );
    } else {
      return (
        <>
          <Spinner
            style={{ position: "absolute" }}
            {...multiComponentStyles.spinner}
          />
          <Text {...multiComponentStyles.text} color="transparent">
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
          {leftIcon ? (
            <Icon
              iconFamily={leftIcon.props!.iconFamily}
              iconName={leftIcon.props!.iconName}
              alignSelf="center"
              marginRight="xs"
              {...leftIconProps}
            />
          ) : null}
          <Text {...multiComponentStyles.text}>{children}</Text>
          {rightIcon ? (
            <Icon
              iconFamily={rightIcon.props!.iconFamily}
              iconName={rightIcon.props!.iconName}
              alignSelf="center"
              marginLeft="xs"
              {...rightIconProps}
            />
          ) : null}
        </Box>
      );
    } else {
      return <Text {...multiComponentStyles.text}>{children}</Text>;
    }
  };

  return (
    <Pressable
      isDisabled={disabled}
      opacity={disabled ? 0.5 : 1}
      onPress={props.onPress}
      alignSelf={isFullWidth ? "stretch" : "flex-start"}
      androidRippleConfig={
        props.androidRippleConfig
          ? props.androidRippleConfig
          : { color: `${colorScheme}.200` }
      }
      accessibilityLabel={!isLoading ? children : "Loading"}
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      {...multiComponentStyles.root}
    >
      {isLoading ? renderLoadingStatus() : renderMainContent()}
    </Pressable>
  );
};

export default Button;
