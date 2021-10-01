import React from "react";
import { Pressable } from "react-native";
import Spinner from "../../Atoms/Spinner/Spinner";
import Box, { BoxProps } from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
import Center from "../../Atoms/Center/Center";
import { useMultiComponentConfig } from "../../../hooks/useMultiComponentConfig";
import Icon from "../../Atoms/Icon/Icon";

type ButtonProps = BoxProps & {
  onPress: () => void;
  size?: string;
  variant?: string;
  loadingText?: string;
  spinnerPlacement?: "start" | "end";
  isLoading?: boolean;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  loadingText = null,
  spinnerPlacement = "start",
  isLoading = false,
  isFullWidth = false,
  isDisabled = false,
  leftIcon = null,
  rightIcon = null,
  ...props
}) => {
  const multiComponentStyles = useMultiComponentConfig("Button", props, {
    size: props["size"],
    variant: props["variant"],
  });

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
      style={({ pressed }) => [
        {
          opacity: disabled ? 0.5 : 1,
          alignSelf: isFullWidth ? "stretch" : "flex-start",
        },
      ]}
      disabled={disabled}
      onPress={disabled ? onPress : null}
    >
      <Center
        alignSelf={isFullWidth ? "stretch" : "flex-start"}
        {...multiComponentStyles.root}
      >
        {isLoading ? renderLoadingStatus() : renderMainContent()}
      </Center>
    </Pressable>
  );
};

export default Button;
