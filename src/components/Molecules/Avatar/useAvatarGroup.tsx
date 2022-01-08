import { createContext, useContext } from "react";
import {
  ComponentSizes,
  ComponentVariants,
  ResponsiveValue,
} from "../../../theme/src/types";

interface IAvatarGroupContext {
  /** Size of all the children avatars in the group. */
  size?: ResponsiveValue<ComponentSizes<"Avatar">>;
  /** Variant of all the children avatars in the group. */
  variant?: ResponsiveValue<ComponentVariants<"Avatar">>;
}

export const avatarGroupContext = createContext({} as IAvatarGroupContext);

/**
 * Hook to get access to the state of a Checkbox group
 */
export const useAvatarGroup = () =>
  useContext(avatarGroupContext) as IAvatarGroupContext;
