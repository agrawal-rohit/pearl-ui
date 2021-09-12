import React from "react";
import { BoxProps, TextProps } from "@shopify/restyle";
import { ActivityIndicator, TouchableHighlight } from "react-native";
import Box from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
import { PearlTheme } from "../../../theme/src/theme";

type ButtonProps = {
  onPress: () => void;
  loading?: boolean;
  textProps?: TextProps<PearlTheme>;
} & Partial<BoxProps<PearlTheme>>;

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  loading,
  textProps,
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
