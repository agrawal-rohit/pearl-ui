import React from "react";
import { Pressable } from "react-native";
import Spinner from "../../Atoms/Spinner/Spinner";
import Box, { BoxProps } from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
import Center from "../../Atoms/Center/Center";
import { useMultiComponentConfig } from "../../../hooks/useMultiComponentConfig";

type ButtonProps = BoxProps & {
  onPress: () => void;
  size?: string;
  variant?: string;
  loadingText?: string;
  spinnerPlacement?: "start" | "end";
  isLoading?: boolean;
  isFullWidth?: boolean;
  isDisabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  loadingText = "Loading",
  spinnerPlacement = "start",
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

  const renderLoadingStatus = () => {
    if (loadingText) {
      return (
        <Box flexDirection="row">
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
        {isLoading ? (
          renderLoadingStatus()
        ) : (
          <Text {...multiComponentStyles.text}>{children}</Text>
        )}
      </Center>
    </Pressable>
  );
};

export default Button;
