import React from "react";
import { MoleculeComponentProps } from "../../../theme/src/types";
import { pearl } from "../../../pearl";
import Text from "../../atoms/text/text";
import Icon from "../../atoms/icon/icon";
import Stack, { StackProps } from "../../atoms/stack/stack";
import { AlertAtoms } from "./alert.config";
import { useStyleProps } from "../../../hooks";
import { boxStyleFunctions } from "../../../theme";
import Box from "../../atoms/box/box";
import IconButton from "../icon-button/icon-button";
import _ from "lodash";

/**
 * BaseAlertProps are the properties for the BaseAlert component.
 * It extends StackProps and adds additional properties.
 */
export type BaseAlertProps = StackProps & {
  /** Custom icon that overrides the default icon in the alert. */
  icon?: React.ReactElement;
  /**
   * Boolean flag to indicate if the alert should be displayed with an icon.
   * @default true
   */
  withIcon?: boolean;
  /** Title text for the alert. */
  title?: string;
  /**  Description text for the alert. */
  description?: string;
  /**
   * Boolean flag to indicate if the alert should be displayed with a close button.
   * @default false
   */
  withCloseButton?: boolean;
  /** Function to be called when the close button is clicked. */
  onClose?: () => void;
};

const BaseAlert = React.memo(
  React.forwardRef(
    (
      {
        atoms,
        children,
        ...rest
      }: MoleculeComponentProps<"Alert", BaseAlertProps, AlertAtoms>,
      ref: any
    ) => {
      let {
        icon,
        withIcon = true,
        title,
        description,
        withCloseButton = false,
        onClose = () => {},
        ...otherContainerProps
      } = atoms.container;
      const computedDescriptionStyles = useStyleProps(
        atoms.description,
        boxStyleFunctions
      );

      if (!icon && withIcon) icon = <Icon {...atoms.icon} />;

      return (
        <Stack
          {...rest}
          ref={ref}
          {...otherContainerProps}
          accessible
          accessibilityRole="alert"
        >
          {icon &&
            React.cloneElement(icon, {
              ...atoms.icon,
              ...icon.props,
            })}
          <Stack {...atoms.stack}>
            <Box flexDirection="row" justifyContent="space-between">
              {title && <Text {...atoms.title}>{title}</Text>}
            </Box>
            {description && (
              <Box style={computedDescriptionStyles.style}>
                <Text {..._.omit(computedDescriptionStyles, ["style"])}>
                  {description}
                </Text>
              </Box>
            )}
          </Stack>

          {withCloseButton && (
            <IconButton
              position="absolute"
              top={5}
              right={7}
              icon={<Icon iconFamily="Ionicons" iconName="close" />}
              {...atoms.closeButton}
              onPress={onClose}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Close Alert"
            />
          )}
        </Stack>
      );
    }
  )
);

/** Alert is used to display a short, important message in a way that attracts the user's attention without interrupting the user's task. */
const Alert = pearl<BaseAlertProps, "molecule", AlertAtoms>(
  BaseAlert,
  {
    componentName: "Alert",
    type: "molecule",
    animatable: true,
  },
  undefined,
  {
    partForOverridenAnimationProps: "container",
    partForOverridenNativeProps: "container",
    partForOverridenStyleProps: "container",
  }
);

export type AlertProps = React.ComponentProps<typeof Alert>;

Alert.displayName = "Alert";

export default Alert;
