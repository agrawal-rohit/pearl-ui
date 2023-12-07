import React from "react";
import Box, { BoxProps } from "../box/box";

/**
 * A layout component that creates an adjustable, empty space that can be used to tune the spacing between sibling elements
 */
const Spacer = React.memo(
  React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
    const { children, ...rest } = props;
    return (
      <Box ref={ref} {...rest} flex={1} alignSelf="stretch">
        {children}
      </Box>
    );
  })
);

Spacer.displayName = "Spacer";

export default Spacer;
