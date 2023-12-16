import { createContext, useContext } from "react";
import {
  ComponentSizes,
  ComponentVariants,
  ResponsiveValue,
} from "../../../theme/src/types";

/**
 * Interface for Avatar Group Context
 * This interface is used to define the context for the Avatar Group
 */
interface IAvatarGroupContext {
  /** Size of all the children avatars in the group. */
  size?: ResponsiveValue<ComponentSizes<"Avatar">>;
  /** Variant of all the children avatars in the group. */
  variant?: ResponsiveValue<ComponentVariants<"Avatar">>;
}

// Create a context for Avatar Group with default value as an empty object of type IAvatarGroupContext
export const avatarGroupContext = createContext({} as IAvatarGroupContext);

/**
 * Hook to get access to the state of an Avatar group
 */
export const useAvatarGroup = () =>
  useContext(avatarGroupContext) as IAvatarGroupContext;
