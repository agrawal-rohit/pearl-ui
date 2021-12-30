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
import { useTheme } from "../../../hooks/useTheme";
import { ColorInput } from "@ctrl/tinycolor";
import {
  ComponentSizes,
  ComponentVariants,
  FinalPearlTheme,
  ResponsiveValue,
} from "../../../theme/src/types";

export type AvatarProps = Omit<ImageProps, "source" | "size" | "variant"> & {
  /** The size of the avatar */
  size?: ResponsiveValue<ComponentSizes<"Avatar">>;
  /** The variant of the avatar */
  variant?: ResponsiveValue<ComponentVariants<"Avatar">>;
  /** The name of the person in the avatar.  If 'src' is not loaded or is missing, the 'name' will be used to create the initials */
  name?: string;
  /** The source of the Avatar image. This can be a url, or a local image */
  src?: string | number;
};

/** The Avatar component is used to represent a user, and displays the profile picture, initials or fallback icon. */
const Avatar: React.FC<AvatarProps> = ({
  children,
  src = undefined,
  name = undefined,
  fallbackComponent = undefined,
  ...rest
}) => {
  const molecularProps = useMolecularComponentConfig("Avatar", rest, {
    size: rest.size,
    variant: rest.variant,
  });

  const pickRandomColor = () => {
    const namedColorKeys = getKeys(namedColors);
    const randomColorKey =
      namedColorKeys[Math.floor(Math.random() * namedColorKeys.length)];

    return randomColorKey;
  };

  const { theme } = useTheme();
  const randomColor = useRef(pickRandomColor()).current;
  const accessibleTextColor = useAccessibleColor(
    (theme.palette[
      molecularProps.root.backgroundColor as keyof FinalPearlTheme["palette"]
    ] as ColorInput) ||
      (theme.palette[
        molecularProps.root.bg as keyof FinalPearlTheme["palette"]
      ] as ColorInput) ||
      molecularProps.root.style.backgroundColor ||
      namedColors[randomColor],
    {
      light: "neutral.50",
      dark: "neutral.900",
    }
  );

  const renderFallBack = () => {
    if (name) {
      const nameInitials = name
        .split(" ")
        .map((el) => el[0])
        .join("")
        .toUpperCase();
      return (
        <Text color={accessibleTextColor} {...molecularProps.text}>
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
    return <Image source={finalSource} {...molecularProps.root} />;
  }

  // Render a fallback
  return (
    <Box
      {...molecularProps.root}
      backgroundColor={
        molecularProps.root.backgroundColor ||
        molecularProps.root.bg ||
        randomColor
      }
      justifyContent="center"
      alignItems="center"
    >
      {renderFallBack()}
    </Box>
  );
};

export default Avatar;
