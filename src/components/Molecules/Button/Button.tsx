import React from "react";
import Spinner from "../../atoms/spinner/spinner";
import Box from "../../atoms/box/box";
import Text from "../../atoms/text/text";
import Pressable, { PressableProps } from "../../atoms/pressable/pressable";
import { MoleculeComponentProps } from "../../../theme/src/types";
import { pearlify } from "../../../pearlify";

export type BaseButtonProps = PressableProps & {
  /** Whether the button is in a loading state.  */
  isLoading?: boolean;
  /** Whether the button should span the entire width of the parent container */
  isFullWidth?: boolean;
  /** The text value to display when the button is in a loading state */
  loadingText?: string;
  /** The position of the loading spinner with respect to the loadingText */
  spinnerPlacement?: "start" | "end";
  /** Icon to display on the left side of the main text */
  leftIcon?: React.ReactElement;
  /** Icon to display on the right side of the main text */
  rightIcon?: React.ReactElement;
  children?: string;
};

/**
 * CustomButton is a forwardRef component that accepts children and props.
 * It destructures the props to get the atoms and rootProps.
 * It also destructures the rootProps to get the necessary properties.
 * It then renders the button based on the loading status and the presence of left and right icons.
 */
const CustomButton = React.forwardRef(
  (
    { children, atoms }: MoleculeComponentProps<"Button", BaseButtonProps>,
    ref: any
  ) => {
    // Destructure the rootProps to get the necessary properties
    const {
      loadingText = null,
      spinnerPlacement = "start",
      isLoading = false,
      isFullWidth = false,
      isDisabled = false,
      leftIcon = null,
      rightIcon = null,
    } = atoms.box;

    // Determine if the button is disabled
    const disabled = isDisabled ? true : isLoading;

    // Function to render the loading status of the button
    const renderLoadingStatus = () => {
      // If there is loading text, render the spinner and the loading text
      if (loadingText) {
        return (
          <Box alignItems="center" flexDirection="row">
            {spinnerPlacement === "start" ? (
              <>
                <Spinner {...atoms.spinner} />
                <Text marginLeft={atoms.box.py} {...atoms.text}>
                  {loadingText}
                </Text>
              </>
            ) : (
              <>
                <Text marginRight={atoms.box.py} {...atoms.text}>
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
                  marginRight: atoms.box.py ?? atoms.box.paddingVertical,
                  ...leftIcon.props,
                })
              : null}
            <Text {...atoms.text}>{children}</Text>
            {rightIcon
              ? React.cloneElement(rightIcon, {
                  ...atoms.icon,
                  marginLeft: atoms.box.py ?? atoms.box.paddingVertical,
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

    // Return the Pressable component with the appropriate props and children
    return (
      <Pressable
        {...atoms.box}
        ref={ref}
        isDisabled={disabled}
        onPress={atoms.box.onPress}
        alignSelf={isFullWidth ? "stretch" : "flex-start"}
        accessibilityLabel={
          !isLoading
            ? atoms.box.accessibilityLabel
              ? atoms.box.accessibilityLabel
              : children
            : "Loading"
        }
        accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      >
        {isLoading ? renderLoadingStatus() : renderMainContent()}
      </Pressable>
    );
  }
);

/** Button is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation */
const Button = pearlify<BaseButtonProps, "molecule">(
  CustomButton,
  {
    componentName: "Button",
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

export type ButtonProps = React.ComponentProps<typeof Button>;

export default Button;
