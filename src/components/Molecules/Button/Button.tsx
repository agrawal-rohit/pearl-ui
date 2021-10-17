import React from "react";
import Spinner from "../../Atoms/Spinner/Spinner";
import Box, { BoxProps } from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import Icon from "../../Atoms/Icon/Icon";
import { useColorScheme } from "../../../hooks/useColorScheme";
import Pressable from "../../Atoms/Pressable/Pressable";

type ButtonProps = BoxProps & {
  onPress: () => void;
  size?: string;
  variant?: string;
  loadingText?: string;
  colorScheme?: string;
  spinnerPlacement?: "start" | "end";
  isLoading?: boolean;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
};

/**  */
const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
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
      return <Spinner {...multiComponentStyles.spinner} />;
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
      onPress={onPress}
      alignSelf={isFullWidth ? "stretch" : "flex-start"}
      androidRippleConfig={{ color: `${colorScheme}.200` }}
      accessibilityLabel={!isLoading ? children : "Loading"}
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      {...multiComponentStyles.root}
    >
      {isLoading ? renderLoadingStatus() : renderMainContent()}
    </Pressable>
  );
};

export default Button;
