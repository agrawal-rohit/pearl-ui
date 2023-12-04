import React from "react";
import Spinner from "../../atoms/spinner/spinner";
import Pressable, { PressableProps } from "../../atoms/pressable/pressable";
import { MoleculeComponentProps } from "../../../theme/src/types";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { boxStyleFunctions } from "../../../theme/src/style-functions";
import { useButtonGroup } from "../button/button-group";

export type IconButtonProps = PressableProps & {
  /**
   * Whether the button is in a loading state.
   *
   * @default false
   */
  isLoading?: boolean;
  /**
   * Whether the button should span the entire width of the parent container.
   *
   * @default false
   */
  isFullWidth?: boolean;
  /** Icon to display within the button. */
  icon: React.ReactElement;
};

/** IconButton is a specialized Button which renders an icon within. It can be used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation */
const IconButton = React.forwardRef(
  (
    {
      icon,
      isLoading = false,
      isFullWidth = false,
      ...rest
    }: Omit<MoleculeComponentProps<"IconButton", IconButtonProps>, "atoms"> & {
      atoms?: Record<string, any>;
    },
    ref: any
  ) => {
    const { size, variant, isDisabled, colorScheme } = useButtonGroup();

    // Overwrite props from checkbox group
    rest.size = rest.size ?? size;
    rest.variant = rest.variant ?? variant;
    rest.isDisabled = rest.isDisabled ?? isDisabled;
    rest.colorScheme = rest.colorScheme ?? colorScheme;

    const molecularProps = useMolecularComponentConfig(
      "IconButton",
      rest,
      {
        size: rest.size,
        variant: rest.variant,
      },
      rest.colorScheme,
      boxStyleFunctions,
      "box",
      "box",
      "box"
    );
    const { atoms } = molecularProps;

    // Determine if the button is disabled
    const isButtonDisabled = rest.isDisabled ? true : isLoading;

    return (
      <Pressable
        {...atoms.box}
        ref={ref}
        isDisabled={isButtonDisabled}
        alignSelf={isFullWidth ? "stretch" : "flex-start"}
        accessibilityLabel={
          !isLoading ? atoms.box.accessibilityLabel : "Loading"
        }
        accessibilityState={{ disabled: isButtonDisabled, busy: isLoading }}
      >
        {isLoading ? (
          <Spinner {...atoms.spinner} />
        ) : (
          React.cloneElement(icon, atoms.icon)
        )}
      </Pressable>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
