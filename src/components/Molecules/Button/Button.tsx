import React from "react";
import { Pressable } from "react-native";
import Spinner from "../../Atoms/Spinner/Spinner";
import { BoxProps } from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
import Center from "../../Atoms/Center/Center";
import { useMultiComponentConfig } from "../../../hooks/useMultiComponentConfig";

type ButtonProps = BoxProps & {
  onPress: () => void;
  size?: string;
  variant?: string;
  isLoading?: boolean;
  isFullWidth?: boolean;
  isDisabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  isLoading = false,
  isFullWidth = false,
  isDisabled = false,
  ...props
}) => {
  const multiComponentStyles = useMultiComponentConfig("Button", props, {
    size: props["size"],
    variant: props["variant"],
  });

  const disabled = isDisabled ? true : isLoading;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1.0,
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
        {isLoading ? (
          <Spinner {...multiComponentStyles.spinner} />
        ) : (
          <Text {...multiComponentStyles.text}>{children}</Text>
        )}
      </Center>
    </Pressable>
  );
};

export default Button;
