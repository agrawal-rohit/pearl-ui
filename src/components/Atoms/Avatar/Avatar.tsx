import React from "react";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import Box from "../../Atoms/Box/Box";
import { ImageProps } from "../../Molecules/Image/Image";

type AvatarProps = ImageProps & {
  /** The size of the avatar */
  size?: string;
  /** The variant of the avatar */
  variant?: string;
};

// TODO: Add main user image render
// TODO: Add icon fallback based on user name
// TODO: Add support for custom fallback icon
// TODO: Add icon badge to avatar

/** The Avatar component is used to represent a user, and displays the profile picture, initials or fallback icon. */
const Avatar: React.FC<AvatarProps> = ({ children, ...rest }) => {
  const props = useMolecularComponentConfig("Avatar", rest, {
    size: rest.size,
    variant: rest.variant,
  });

  return <Box></Box>;
};

export default Avatar;
