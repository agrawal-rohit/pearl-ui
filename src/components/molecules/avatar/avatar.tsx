import React, { useRef } from "react";
import { ImageProps } from "../image/image";
import Image from "../image/image";
import { ImageSourcePropType, ViewStyle } from "react-native";
import Box from "../../atoms/box/box";
import Text from "../../atoms/text/text";
import { useAccessibleColor } from "../../../hooks/useAccessibleColor";
import {
  MoleculeComponentProps,
  PaletteColors,
} from "../../../theme/src/types";
import { pearl } from "../../../pearl";
import { useAvatarGroup } from "./useAvatarGroup";
import { AvatarAtoms } from "./avatar.config";

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

const DEFAULT_AVATAR_BACKGROUND = [
  "#c8e6d0ff",
  "#e0ecbaff",
  "#fbb991ff",
  "#f27e81ff",
  "#8bc7d3ff",
  "#bcdfd8ff",
  "#fae3d9ff",
  "#f8b4b9ff",
  "#c2b0d7ff",
  "#eeef99ff",
  "#a5d7c4ff",
  "#fef5aeff",
  "#f7bdd6ff",
  "#d6a5cbff",
  "#c38788ff",
  "#FA8072",
  "#FFD700",
  "#FFA500",
];

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
  /** A custom list of background colors to choose the avatar background from.
   * 
   * @default
   * [
      "#c8e6d0ff",
      "#e0ecbaff",
      "#fbb991ff",
      "#f27e81ff",
      "#8bc7d3ff",
      "#bcdfd8ff",
      "#fae3d9ff",
      "#f8b4b9ff",
      "#c2b0d7ff",
      "#eeef99ff",
      "#a5d7c4ff",
      "#fef5aeff",
      "#f7bdd6ff",
      "#d6a5cbff",
      "#c38788ff",
      "#FA8072",
      "#FFD700",
      "#FFA500",
    ]
   */
  customBackgroundColors?: string[];
};

/**
 * CustomAvatar is a component that renders an avatar image, initials or a fallback component.
 * It uses the name, src, getInitials, atoms, and fallbackComponent props from the parent Avatar component.
 * If an image source is provided, it will render the image.
 * If no image source is provided but a name is provided, it will render the initials of the name.
 * If neither image source nor name is provided, it will render the fallbackComponent.
 * If no fallbackComponent is provided, it will render nothing.
 */
const CustomAvatar = React.memo(
  React.forwardRef(
    (
      { atoms }: MoleculeComponentProps<"Avatar", BaseAvatarProps, AvatarAtoms>,
      ref: any
    ) => {
      const { name, src, getInitials, fallbackComponent, ...otherBoxProps } =
        atoms.box;

      // Function to pick a random color from the namedColors object
      const pickRandomColor = () =>
        DEFAULT_AVATAR_BACKGROUND[
          Math.floor(Math.random() * DEFAULT_AVATAR_BACKGROUND.length)
        ];

      // Store the random color in a ref to prevent it from changing on re-renders
      const randomColor = useRef(pickRandomColor()).current;
      // Determine the text color based on the background color to ensure accessibility
      const accessibleTextColor = useAccessibleColor(
        typeof otherBoxProps.backgroundColor === "string"
          ? (otherBoxProps.backgroundColor as PaletteColors)
          : typeof otherBoxProps.bgColor === "string"
          ? (otherBoxProps.bgColor as PaletteColors)
          : typeof (otherBoxProps.style as ViewStyle)?.backgroundColor ===
            "string"
          ? ((otherBoxProps.style as ViewStyle)
              ?.backgroundColor as PaletteColors)
          : randomColor,
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
        return <Image ref={ref} source={finalSource} {...otherBoxProps} />;
      }

      // If no source is provided, render the fallback
      return (
        <Box
          {...otherBoxProps}
          backgroundColor={
            otherBoxProps.backgroundColor ??
            otherBoxProps.bgColor ??
            randomColor
          }
          justifyContent="center"
          alignItems="center"
        >
          {renderFallBack()}
        </Box>
      );
    }
  )
);

const StyledAvatar = pearl<BaseAvatarProps, "molecule">(
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

Avatar.displayName = "Avatar";

export default Avatar;
