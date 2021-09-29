import React from "react";
import { Pressable } from "react-native";
import Spinner from "../../Atoms/Spinner/Spinner";
import { BoxProps } from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
import { useComponentConfig } from "../../../hooks/useComponentConfig";
import ButtonConfig from "./Button.config";
import Center from "../../Atoms/Center/Center";

type ButtonProps = BoxProps & {
  onPress: () => void;
  loading?: boolean;
  size?: keyof typeof ButtonConfig["sizes"];
  variant?: keyof typeof ButtonConfig["variants"];
};

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  loading,
  ...props
}) => {
  const componentStyles = useComponentConfig("Button", props, {
    size: props["size"],
    variant: props["variant"],
  });

  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1.0 }]}
      onPress={onPress}
    >
      <Center width="auto" {...componentStyles}>
        {loading ? (
          <Spinner color="neutral.100" />
        ) : (
          <Text variant="btn3">{children}</Text>
        )}
      </Center>
    </Pressable>
  );
};

export default Button;
