import React from "react";
import { ActivityIndicator, TouchableHighlight } from "react-native";
import Box, { BoxProps } from "../../Atoms/Box/Box";
import Text, { TextProps } from "../../Atoms/Text/Text";
import { BasePearlTheme } from "../../../theme/src/types";
import { baseLightTheme } from "../../../theme/src/basetheme";

type ButtonProps = BoxProps<typeof baseLightTheme> & {
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
      backgroundColor="primary500"
      borderRadius={5}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text color="buttonTextColor" variant="button">
          {children}
        </Text>
      )}
    </Box>
  </TouchableHighlight>
);

export default Button;
