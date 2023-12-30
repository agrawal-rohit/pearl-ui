import React, { useState } from "react";
import Box from "../../atoms/box/box";
import Collapse, { CollapseProps } from "../../atoms/collapse/collapse";
import { MoleculeComponentProps } from "../../../theme/src/types";
import { pearl } from "../../../pearl";
import Pressable, { PressableProps } from "../../atoms/pressable/pressable";
import Icon from "../../atoms/icon/icon";
import Stack, { StackProps } from "../../atoms/stack/stack";
import { AccordionAtoms } from "./accordion.config";

export type BaseAccordionProps = StackProps & {
  /**
   * If true, multiple accordion items can be expanded at once.
   *
   * @default false
   */
  allowMultiple?: boolean;
  /**
   * If true, any expanded accordion item can be collapsed again.
   *
   * @default false
   */
  allowToggle?: boolean;
  /**
   * The initial index(es) of the expanded accordion item.
   */
  defaultIndices?: number[];
  /**
   * If true, height animation and transitions will be disabled.
   *
   * @default false
   */
  reduceMotion?: boolean;
};

/**
 * Props for AccordionItem component.
 */
export type AccordionItemProps = Omit<StackProps, "children"> & {
  /**
   * The index of the accordion item.
   */
  index?: number;
  /**
   * The children of the accordion item, which can be a function.
   * If it is a function, it receives the expanded state of the accordion item as an argument.
   */
  children?: React.ReactNode | ((isExpanded: boolean) => React.ReactNode);
};

/**
 * Props for AccordionButton component.
 */
export type AccordionButtonProps = Omit<PressableProps, "onPress"> & {
  /**
   * A function that is called when the accordion item is pressed.
   * It receives the index of the accordion item as an argument.
   */
  onPress?: (index: number) => void;
  /**
   * The content of the button.
   */
  children?: React.ReactNode;
  /** Icon to display on the left side of the text input */
  icon?: React.ReactElement;
};

/**
 * Props for AccordionPanel component.
 */
export type AccordionPanelProps = Omit<CollapseProps, "show"> & {
  /**
   * The content of the panel.
   */
  children?: React.ReactNode;
};

const AccordionContext = React.createContext<{
  itemProps: AccordionItemProps;
  buttonProps: AccordionButtonProps;
  panelProps: AccordionPanelProps;
  expansionStatus: boolean[];
  reduceMotion: boolean;
}>({
  expansionStatus: [],
  reduceMotion: false,
  itemProps: {},
  buttonProps: {},
  panelProps: {},
});

const AccordionItemContext = React.createContext<{
  index: number;
}>({
  index: 0,
});

const BaseAccordion = React.memo(
  React.forwardRef(
    (
      {
        atoms,
        children,
        ...rest
      }: MoleculeComponentProps<
        "Accordion",
        BaseAccordionProps,
        AccordionAtoms
      >,
      ref: any
    ) => {
      const {
        allowMultiple = false,
        allowToggle = false,
        defaultIndices = [],
        reduceMotion = false,
        ...otherContainerProps
      } = atoms.container;

      const [expansionStatus, setExpansionStatus] = useState(
        new Array(React.Children.count(children))
          .fill(false)
          .map((_, index) => defaultIndices.includes(index))
      );

      const toggleExpanded = (index: number) => {
        setExpansionStatus((prevIsExpanded) => {
          const newIsExpanded = [...prevIsExpanded];
          if (allowToggle && !allowMultiple) {
            newIsExpanded[index] = !newIsExpanded[index];
          } else if (!allowToggle && allowMultiple) {
            newIsExpanded[index] = true;
          } else if (allowToggle && allowMultiple) {
            newIsExpanded[index] = !newIsExpanded[index];
          } else {
            newIsExpanded.fill(false);
            newIsExpanded[index] = true;
          }
          return newIsExpanded;
        });
      };

      return (
        <AccordionContext.Provider
          value={{
            reduceMotion,
            expansionStatus,
            itemProps: atoms.item,
            buttonProps: {
              ...atoms.button,
              onPress: (idx: number) => toggleExpanded(idx),
            },
            panelProps: atoms.panel,
          }}
        >
          <Stack {...rest} ref={ref} {...otherContainerProps}>
            {React.Children.map(children, (child, index) =>
              React.cloneElement(child as React.ReactElement, {
                key: index,
                index: index,
              })
            )}
          </Stack>
        </AccordionContext.Provider>
      );
    }
  )
);

export const AccordionItem = React.memo(
  ({ children, key, index = 0, ...props }: AccordionItemProps) => {
    const { itemProps, expansionStatus } = React.useContext(AccordionContext);
    const isExpanded = !!expansionStatus[index];

    return (
      <Stack w="100%" {...itemProps} {...props}>
        <AccordionItemContext.Provider
          value={{
            index: index,
          }}
        >
          {typeof children === "function" ? children(isExpanded) : children}
        </AccordionItemContext.Provider>
      </Stack>
    );
  }
);

export const AccordionButton = React.memo(
  ({ children, icon, ...props }: AccordionButtonProps) => {
    const { buttonProps, expansionStatus } = React.useContext(AccordionContext);
    const { index } = React.useContext(AccordionItemContext);
    const isExpanded = !!expansionStatus[index];

    if (!icon)
      icon = (
        <Icon
          size="xs"
          iconFamily="Feather"
          iconName={isExpanded ? "chevron-up" : "chevron-down"}
        />
      );

    return (
      <Pressable
        {...buttonProps}
        {...props}
        accessible={true}
        accessibilityRole="button"
        onPress={() => {
          if (buttonProps.onPress) buttonProps.onPress(index);
        }}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {children}
          {icon && React.cloneElement(icon)}
        </Box>
      </Pressable>
    );
  }
);

export const AccordionPanel = React.memo(
  ({ children, ...props }: AccordionPanelProps) => {
    const { panelProps, reduceMotion, expansionStatus } =
      React.useContext(AccordionContext);
    const { index } = React.useContext(AccordionItemContext);
    const isExpanded = !!expansionStatus[index];

    return (
      <Collapse
        {...panelProps}
        {...props}
        show={isExpanded}
        transition={
          reduceMotion
            ? {
                type: "timing",
                duration: 1,
              }
            : undefined
        }
        exitTransition={
          reduceMotion
            ? {
                type: "timing",
                duration: 1,
              }
            : undefined
        }
      >
        {children}
      </Collapse>
    );
  }
);

/** The Accordion component provides an expandable view. */
const Accordion = pearl<BaseAccordionProps, "molecule">(
  BaseAccordion,
  {
    componentName: "Accordion",
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

export type AccordionProps = React.ComponentProps<typeof Accordion>;

Accordion.displayName = "Accordion";
AccordionItem.displayName = "AccordionItem";
AccordionButton.displayName = "AccordionButton";
AccordionPanel.displayName = "AccordionPanel";

export default Accordion;
