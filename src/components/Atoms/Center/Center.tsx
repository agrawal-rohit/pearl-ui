import { BoxProps, boxRestyleFunctions, useRestyle } from "@shopify/restyle";
import React from "react";
import { PearlTheme } from "../../../theme/src/theme";
import Box from "../Box/Box";

const Center: React.FC<BoxProps<PearlTheme>> = ({ children, ...rest }) => {
  const props = useRestyle(boxRestyleFunctions, rest);

  return (
    <Box alignItems="center" justifyContent="center" {...props}>
      {children}
    </Box>
  );
};

export default Center;
