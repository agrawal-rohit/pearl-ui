import React from "react";
import Box, { BoxProps } from "../Box/Box";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";

type DividerProps = BoxProps & {
  /** The size of the divider */
  size?: string;
  /** The variant of the divider */
  variant?: string;
  /** The length of the divider */
  length?: number | string;
  /** The thickness of the divider */
  thickness?: number;
  /** The direction of the divider */
  orientation?: "horizontal" | "vertical";
};

/** Divider is used to visually separate content in a list or group. */
const Divider: React.FC<DividerProps> = ({
  children,
  orientation = "horizontal",
  ...props
}) => {
  const componentSpecificProps = useAtomicComponentConfig("Divider", props, {
    size: props.size,
    variant: props.size,
  });

  return (
    <Box
      {...componentSpecificProps}
      h={
        orientation === "horizontal"
          ? componentSpecificProps.thickness
          : componentSpecificProps.length
      }
      w={
        orientation === "vertical"
          ? componentSpecificProps.thickness
          : componentSpecificProps.length
      }
      flex={
        orientation === "vertical" ? componentSpecificProps.thickness : null
      }
    >
      {children}
    </Box>
  );
};

export default Divider;
