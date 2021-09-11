import { BoxProps, boxRestyleFunctions, useRestyle } from "@shopify/restyle";
import React from "react";
import { Theme } from "../../../theme/theme";
import Box from "../Box/Box";

const Center: React.FC<BoxProps<Theme>> = ({ children, ...rest }) => {
  const props = useRestyle(boxRestyleFunctions, rest);

  return (
    <Box alignItems="center" justifyContent="center" {...props}>
      {children}
    </Box>
  );
};

export default Center;
