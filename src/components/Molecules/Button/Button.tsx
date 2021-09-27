import React from "react";
import { Pressable } from "react-native";
import ActivityIndicator from "../../Atoms/ActivityIndicator/ActivityIndicator";
import Box, { BoxProps } from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";

type ButtonProps = BoxProps & {
  onPress: () => void;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  loading,
  ...props
}) => (
  <Pressable
    style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1.0 }]}
    onPress={onPress}
  >
    <Box
      py="m"
      px="m"
      backgroundColor="primary-500"
      borderRadius="m"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="neutral-100" />
      ) : (
        <Text variant="btn3">{children}</Text>
      )}
    </Box>
  </Pressable>
);

export default Button;
