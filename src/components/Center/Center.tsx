import React from "react";
import { Box } from "../..";

const Center: React.FC = ({ children, ...props }) => {
  return (
    <Box alignItems="center" justifyContent="center" {...props}>
      {children}
    </Box>
  );
};

export default Center;
