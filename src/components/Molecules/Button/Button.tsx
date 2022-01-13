import React, { RefObject } from "react";
import Spinner from "../../Atoms/Spinner/Spinner";
import Box, { BoxProps } from "../../Atoms/Box/Box";
import Text from "../../Atoms/Text/Text";
import Pressable, { PressableProps } from "../../Atoms/Pressable/Pressable";
import { ColorScheme, MoleculeComponentProps } from "../../../theme/src/types";
import { pearlify } from "../../../hooks/pearlify";

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

const CustomButton = React.forwardRef(
  (
    { children, ...props }: MoleculeComponentProps<"Button", BaseButtonProps>,
    ref: any
  ) => {
    const { atoms, ...rootProps } = props;
    const {
      loadingText = null,
      colorScheme = "primary",
      spinnerPlacement = "start",
      isLoading = false,
      isFullWidth = false,
      isDisabled = false,
      leftIcon = null,
      rightIcon = null,
      ...otherRootProps
    } = rootProps;

    const disabled = isDisabled ? true : isLoading;

    const renderLoadingStatus = () => {
      if (loadingText) {
        return (
          <Box alignItems="center" flexDirection="row">
            {spinnerPlacement === "start" ? (
              <>
                <Spinner {...atoms.spinner} />
                <Text marginLeft={rootProps.py} {...atoms.text}>
                  {loadingText}
                </Text>
              </>
            ) : (
              <>
                <Text marginRight={rootProps.py} {...atoms.text}>
                  {loadingText}
                </Text>

                <Spinner {...atoms.spinner} />
              </>
            )}
          </Box>
        );
      } else {
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

    const renderMainContent = () => {
      if (leftIcon || rightIcon) {
        return (
          <Box flexDirection="row">
            {leftIcon
              ? React.cloneElement(leftIcon, {
                  ...atoms.icon,
                  marginRight: rootProps.py || rootProps.paddingVertical,
                  ...leftIcon.props,
                })
              : null}
            <Text {...atoms.text}>{children}</Text>
            {rightIcon
              ? React.cloneElement(rightIcon, {
                  ...atoms.icon,
                  marginLeft: rootProps.py || rootProps.paddingVertical,
                  ...rightIcon.props,
                })
              : null}
          </Box>
        );
      } else {
        return <Text {...atoms.text}>{children}</Text>;
      }
    };

    return (
      <Pressable
        {...otherRootProps}
        ref={ref}
        isDisabled={disabled}
        opacity={disabled ? 0.5 : 1}
        onPress={rootProps.onPress}
        alignSelf={isFullWidth ? "stretch" : "flex-start"}
        accessibilityLabel={
          !isLoading
            ? rootProps.accessibilityLabel
              ? rootProps.accessibilityLabel
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
const Button = pearlify<BaseButtonProps, "molecule">(CustomButton, {
  componentName: "Button",
  type: "molecule",
  animatable: true,
});

export type ButtonProps = React.ComponentProps<typeof Button>;

export default Button;
