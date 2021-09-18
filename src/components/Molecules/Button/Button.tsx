import React from "react";
import { TouchableHighlight } from "react-native";
import ActivityIndicator from "../../Atoms/ActivityIndicator/ActivityIndicator";
import Box, { BoxProps } from "../../Atoms/Box/Box";
import Text, { TextProps } from "../../Atoms/Text/Text";

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
  <TouchableHighlight underlayColor="transparent" onPress={onPress}>
    <Box
      py="m"
      px="m"
      backgroundColor="primary-500"
      borderRadius="s"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="neutral-100" />
      ) : (
        <Text variant="button">{children}</Text>
      )}
    </Box>
  </TouchableHighlight>
);

export default Button;
