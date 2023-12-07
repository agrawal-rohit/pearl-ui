import React from "react";
import Spinner from "../../atoms/spinner/spinner";
import Box from "../../atoms/box/box";
import Text from "../../atoms/text/text";
import Pressable, { PressableProps } from "../../atoms/pressable/pressable";
import { MoleculeComponentProps } from "../../../theme/src/types";
import { useButtonGroup } from "./button-group";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import { boxStyleFunctions } from "../../../theme/src/style-functions";
import { ButtonAtoms } from "./button.config";

export type ButtonProps = PressableProps & {
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
  /** The text value to display when the button is in a loading state */
  loadingText?: string;
  /**
   * The position of the loading spinner with respect to the loadingText.
   *
   * @default "start"
   */
  spinnerPlacement?: "start" | "end";
  /** Icon to display on the left side of the main text */
  leftIcon?: React.ReactElement;
  /** Icon to display on the right side of the main text */
  rightIcon?: React.ReactElement;
  children?: string;
};

/** Button is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation */
const Button = React.memo(
  React.forwardRef(
    (
      {
        children,
        loadingText = undefined,
        spinnerPlacement = "start",
        isLoading = false,
        isFullWidth = false,
        leftIcon = undefined,
        rightIcon = undefined,
        ...rest
      }: Omit<
        MoleculeComponentProps<"Button", ButtonProps, ButtonAtoms>,
        "atoms"
      > & {
        atoms?: ButtonAtoms;
      },
      ref: any
    ) => {
      const { size, variant, isDisabled, colorScheme } = useButtonGroup();

      // Overwrite props from checkbox group
      rest.size = rest.size ?? size;
      rest.variant = rest.variant ?? variant;
      rest.isDisabled = rest.isDisabled ?? isDisabled;
      rest.colorScheme = rest.colorScheme ?? colorScheme;

      const molecularProps = useMolecularComponentConfig<ButtonAtoms>(
        "Button",
        rest,
        {
          size: rest.size,
          variant: rest.variant,
        },
        rest.colorScheme,
        boxStyleFunctions,
        "pressable",
        "pressable",
        "pressable"
      );
      const { atoms } = molecularProps;

      // Determine if the button is disabled
      const isButtonDisabled = rest.isDisabled ? true : isLoading;

      // Function to render the loading status of the button
      const renderLoadingStatus = () => {
        // If there is loading text, render the spinner and the loading text
        if (loadingText) {
          return (
            <Box alignItems="center" flexDirection="row">
              {spinnerPlacement === "start" ? (
                <>
                  <Spinner {...atoms.spinner} />
                  <Text marginLeft={atoms.pressable.py} {...atoms.text}>
                    {loadingText}
                  </Text>
                </>
              ) : (
                <>
                  <Text marginRight={atoms.pressable.py} {...atoms.text}>
                    {loadingText}
                  </Text>

                  <Spinner {...atoms.spinner} />
                </>
              )}
            </Box>
          );
        } else {
          // If there is no loading text, render the spinner and the children with transparent color
          return (
            <>
              <Spinner isExpanded {...atoms.spinner} />
              <Text {...atoms.text} color="transparent">
                {children}
              </Text>
            </>
          );
        }
      };

      // Function to render the main content of the button
      const renderMainContent = () => {
        // If there are left or right icons, render them along with the children
        if (leftIcon || rightIcon) {
          return (
            <Box flexDirection="row">
              {leftIcon
                ? React.cloneElement(leftIcon, {
                    ...atoms.icon,
                    marginRight:
                      atoms.pressable.py ?? atoms.pressable.paddingVertical,
                    ...leftIcon.props,
                  })
                : null}
              <Text {...atoms.text}>{children}</Text>
              {rightIcon
                ? React.cloneElement(rightIcon, {
                    ...atoms.icon,
                    marginLeft:
                      atoms.pressable.py ?? atoms.pressable.paddingVertical,
                    ...rightIcon.props,
                  })
                : null}
            </Box>
          );
        } else {
          // If there are no icons, render only the children
          return <Text {...atoms.text}>{children}</Text>;
        }
      };

      return (
        <Pressable
          {...atoms.pressable}
          ref={ref}
          isDisabled={isButtonDisabled}
          alignSelf={isFullWidth ? "stretch" : "flex-start"}
          accessibilityLabel={
            !isLoading
              ? atoms.pressable.accessibilityLabel
                ? atoms.pressable.accessibilityLabel
                : children
              : "Loading"
          }
          accessibilityState={{ disabled: isButtonDisabled, busy: isLoading }}
        >
          {isLoading ? renderLoadingStatus() : renderMainContent()}
        </Pressable>
      );
    }
  )
);

Button.displayName = "Button";

export default Button;
