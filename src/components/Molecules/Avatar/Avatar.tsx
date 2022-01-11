import React, { useRef } from "react";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { ImageProps } from "../Image/Image";
import Image from "../Image/Image";
import { ImageSourcePropType } from "react-native";
import Box from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
import namedColors from "../../../theme/utils/namedColors.json";
import { getKeys } from "../../../theme/utils/typeHelpers";
import { useAccessibleColor } from "../../../hooks/useAccessibleColor";
import {
  ComponentSizes,
  ComponentVariants,
  ResponsiveValue,
} from "../../../theme/src/types";
import { pearlify } from "../../../hooks/pearlify";
import { useAvatarGroup } from "./useAvatarGroup";

const defaultGetInitials = (name: string) =>
  name
    .split(" ")
    .map((el) => el[0])
    .join("")
    .toUpperCase();

export type AvatarProps = Omit<ImageProps, "source" | "size" | "variant"> & {
  /** The size of the avatar */
  size?: ResponsiveValue<ComponentSizes<"Avatar">>;
  /** The variant of the avatar */
  variant?: ResponsiveValue<ComponentVariants<"Avatar">>;
  /** The name of the person in the avatar.  If 'src' is not loaded or is missing, the 'name' will be used to create the initials */
  name?: string;
  /** The source of the Avatar image. This can be a url, or a local image */
  src?: string | number;
  /** A method to specify how initials are generated from a user's name */
  getInitials?(name: string): string;
};

const CustomAvatar: React.FC<AvatarProps> = ({ children, ...props }) => {
  const { name, src, getInitials, fallbackComponent, ...rootProps } = (
    props as any
  ).root;

  const pickRandomColor = () => {
    const namedColorKeys = getKeys(namedColors).filter(
      (color) => color !== "transparent"
    );
    const randomColorKey =
      namedColorKeys[Math.floor(Math.random() * namedColorKeys.length)];

    return randomColorKey;
  };

  const randomColor = useRef(pickRandomColor()).current;
  const accessibleTextColor = useAccessibleColor(
    rootProps.backgroundColor || rootProps.bg || randomColor,
    {
      light: "neutral.50",
      dark: "neutral.900",
    }
  );

  const renderFallBack = () => {
    if (name) {
      const initialComputeFunction = getInitials || defaultGetInitials;
      const nameInitials = initialComputeFunction(name);
      return (
        <Text color={accessibleTextColor} {...(props as any).text}>
          {nameInitials}
        </Text>
      );
    }

    if (fallbackComponent) return React.cloneElement(fallbackComponent);

    return null;
  };

  const finalSource =
    src && typeof src === "string"
      ? ({ uri: src } as ImageSourcePropType)
      : (src as ImageSourcePropType);

  if (finalSource) {
    return <Image source={finalSource} {...rootProps} />;
  }

  // Render a fallback
  return (
    <Box
      {...rootProps}
      backgroundColor={rootProps.backgroundColor || rootProps.bg || randomColor}
      justifyContent="center"
      alignItems="center"
    >
      {renderFallBack()}
    </Box>
  );
};

/** The Avatar component is used to represent a user, and displays the profile picture, initials or fallback icon. */
const Avatar: React.FC<AvatarProps> = ({ children, ...rest }) => {
  let { size, variant } = useAvatarGroup();

  // Overwrite props from avatar group
  rest.size = size || rest.size;
  rest.variant = variant || rest.variant;

  const StyledAvatar = pearlify(CustomAvatar, {
    componentName: "Avatar",
    type: "molecule",
  });

  // Render a fallback
  return <StyledAvatar {...(rest as any)}>{children}</StyledAvatar>;
};

export default Avatar;
