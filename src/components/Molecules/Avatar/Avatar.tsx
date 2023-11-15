import React, { useRef } from "react";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { ImageProps } from "../image/image";
import Image from "../image/image";
import { ImageSourcePropType } from "react-native";
import Box from "../../atoms/box/box";
import Text from "../../atoms/text/text";
import namedColors from "../../../theme/utils/named-colors.json";
import { getKeys } from "../../../theme/utils/type-helpers";
import { useAccessibleColor } from "../../../hooks/useAccessibleColor";
import { MoleculeComponentProps } from "../../../theme/src/types";
import { pearlify } from "../../../pearlify";
import { useAvatarGroup } from "./useAvatarGroup";

/**
 * A function that generates initials from a name
 * @param name The name to generate initials from
 * @returns The initials generated from the name
 */
const defaultGetInitials = (name: string) =>
  name
    .split(" ")
    .map((el) => el[0])
    .join("")
    .toUpperCase();

export type BaseAvatarProps = Omit<
  ImageProps,
  "source" | "size" | "variant"
> & {
  /** The name of the person in the avatar.  If 'src' is not loaded or is missing, the 'name' will be used to create the initials */
  name?: string;
  /** The source of the Avatar image. This can be a url, or a local image */
  src?: string | number;
  /** A method to specify how initials are generated from a user's name */
  getInitials?(name: string): string;
};

/**
 * CustomAvatar is a component that renders an avatar image, initials or a fallback component.
 * It uses the name, src, getInitials, atoms, and fallbackComponent props from the parent Avatar component.
 * If an image source is provided, it will render the image.
 * If no image source is provided but a name is provided, it will render the initials of the name.
 * If neither image source nor name is provided, it will render the fallbackComponent.
 * If no fallbackComponent is provided, it will render nothing.
 */
const CustomAvatar = React.forwardRef(
  (
    { children, ...props }: MoleculeComponentProps<"Avatar", BaseAvatarProps>,
    ref: any
  ) => {
    const { name, src, getInitials, atoms, fallbackComponent } = props;

    // Function to pick a random color from the namedColors object
    const pickRandomColor = () => {
      const namedColorKeys = getKeys(namedColors).filter(
        (color) => color !== "transparent"
      );
      const randomColorKey =
        namedColorKeys[Math.floor(Math.random() * namedColorKeys.length)];

      return randomColorKey;
    };

    // Store the random color in a ref to prevent it from changing on re-renders
    const randomColor = useRef(pickRandomColor()).current;
    // Determine the text color based on the background color to ensure accessibility
    const accessibleTextColor = useAccessibleColor(
      atoms.box.backgroundColor ??
        atoms.box.bgColor ??
        atoms.box.style.backgroundColor ??
        randomColor,
      {
        light: "neutral.50",
        dark: "neutral.900",
      }
    );

    // Function to render the fallback component (initials or fallbackComponent prop)
    const renderFallBack = () => {
      if (name) {
        const initialComputeFunction = getInitials ?? defaultGetInitials;
        const nameInitials = initialComputeFunction(name);
        return (
          <Text color={accessibleTextColor} {...atoms.text}>
            {nameInitials}
          </Text>
        );
      }

      if (fallbackComponent) return React.cloneElement(fallbackComponent);

      return null;
    };

    // Determine the final source of the image
    const finalSource =
      src && typeof src === "string"
        ? ({ uri: src } as ImageSourcePropType)
        : (src as ImageSourcePropType);

    // If a source is provided, render the image
    if (finalSource) {
      return <Image ref={ref} source={finalSource} {...atoms.box} />;
    }

    // If no source is provided, render the fallback
    return (
      <Box
        {...atoms.box}
        backgroundColor={
          atoms.box.backgroundColor ?? atoms.box.bgColor ?? randomColor
        }
        justifyContent="center"
        alignItems="center"
      >
        {renderFallBack()}
      </Box>
    );
  }
);

const StyledAvatar = pearlify<BaseAvatarProps, "molecule">(
  CustomAvatar,
  {
    componentName: "Avatar",
    type: "molecule",
    animatable: true,
  },
  undefined,
  {
    partForOverridenStyleProps: "box",
    partForOverridenNativeProps: "box",
    partForOverridenAnimationProps: "box",
  }
);

/** The Avatar component is used to represent a user, and displays the profile picture, initials or fallback icon. */
const Avatar = React.forwardRef(
  (
    {
      children,
      ...rest
    }: Omit<MoleculeComponentProps<"Avatar", BaseAvatarProps>, "atoms"> & {
      atoms?: Record<string, any>;
    },
    ref: any
  ) => {
    let { size, variant } = useAvatarGroup();

    // Overwrite props from avatar group
    rest.size = size ?? rest.size;
    rest.variant = variant ?? rest.variant;

    // Render a fallback
    return (
      <StyledAvatar {...rest} ref={ref}>
        {children}
      </StyledAvatar>
    );
  }
);

export type AvatarProps = React.ComponentProps<typeof Avatar>;

export default Avatar;
