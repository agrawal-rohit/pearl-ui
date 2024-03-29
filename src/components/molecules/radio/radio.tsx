import React from "react";
import Text from "../../atoms/text/text";
import {
  FinalPearlTheme,
  ResponsiveValue,
  MoleculeComponentProps,
  StateProps,
} from "../../../theme/src/types";
import Pressable, { PressableProps } from "../../atoms/pressable/pressable";
import { useMolecularComponentConfig } from "../../../hooks/useMolecularComponentConfig";
import Stack from "../../atoms/stack/stack";
import { boxStyleFunctions } from "../../../theme/src/style-functions";
import { useRadioGroup } from "./radio-group";
import { useCheckedState } from "../../../hooks/state/useCheckedState";
import { useInvalidState } from "../../../hooks/state/useInvalidState";
import Center from "../../atoms/center/center";
import Box from "../../atoms/box/box";
import _ from "lodash";
import { RadioAtoms } from "./radio.config";

export type BaseRadioProps = PressableProps &
  StateProps<"_checked" | "_invalid" | "_disabled"> & {
    /** Value of the radio if it is part of a group. */
    value?: string | number | undefined;
    /**
     * Whether the radio is disabled.
     *
     * @default false
     */
    isDisabled?: boolean;
    /**
     * Whether the radio is in a checked state.
     *
     * @default false
     */
    isChecked?: boolean;
    /**
     * Whether the radio is in an error state.
     *
     * @default false
     */
    isInvalid?: boolean;
    /**
     * The spacing between the radio and the label text.
     *
     * @default 2
     */
    spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
    children?: string;
  };

/** The Radio component is used when only one choice may be selected in a series of options. **/
const Radio = React.memo(
  React.forwardRef(
    (
      {
        children,
        onPress = () => {},
        ...rest
      }: Omit<
        MoleculeComponentProps<"Radio", BaseRadioProps, RadioAtoms>,
        "atoms"
      > & {
        atoms?: Partial<RadioAtoms>;
      },
      radioRef: any
    ) => {
      const {
        size,
        variant,
        isDisabled,
        colorScheme,
        radioGroupValue,
        setRadioGroupValue,
      } = useRadioGroup();

      // Overwrite props from radio group
      rest.size = rest.size ?? size;
      rest.variant = rest.variant ?? variant;
      rest.isDisabled = rest.isDisabled ?? isDisabled;
      rest.colorScheme = rest.colorScheme ?? colorScheme;

      const isRadioInGroup = setRadioGroupValue !== undefined;
      const isRadioChecked = isRadioInGroup
        ? radioGroupValue === rest.value && rest.value !== undefined
        : rest.isChecked;

      const molecularProps = useMolecularComponentConfig<RadioAtoms>(
        "Radio",
        rest,
        {
          size: rest.size,
          variant: rest.variant,
        },
        rest.colorScheme,
        boxStyleFunctions,
        "container",
        "container",
        "container"
      );
      const { atoms } = molecularProps;

      // Use state for dynamic style
      const { propsWithCheckedStyles: propsWithCheckedStylesForOuterBox } =
        useCheckedState(
          atoms.outerBox,
          boxStyleFunctions,
          "molecule",
          true,
          isRadioChecked
        );
      atoms.outerBox = propsWithCheckedStylesForOuterBox;
      const { propsWithInvalidStyles } = useInvalidState(
        atoms.outerBox,
        boxStyleFunctions,
        "molecule",
        true,
        rest.isInvalid
      );
      atoms.outerBox = propsWithInvalidStyles;
      const { propsWithCheckedStyles: propsWithCheckedStylesForInnerBox } =
        useCheckedState(
          atoms.innerBox,
          boxStyleFunctions,
          "molecule",
          true,
          isRadioChecked
        );
      atoms.innerBox = propsWithCheckedStylesForInnerBox;

      // OTHER METHODS
      const radioPressHandler = () => {
        if (isRadioInGroup) {
          setRadioGroupValue(rest.value);
          if (onPress) onPress();
        }
        if (onPress) onPress();
      };

      // RENDER METHODS
      return (
        <Pressable
          {...atoms.container}
          ref={radioRef}
          onPress={radioPressHandler}
          accessible={true}
          accessibilityRole="radio"
          isDisabled={rest.isDisabled}
          accessibilityLabel={
            rest.accessibilityLabel ? rest.accessibilityLabel : children
          }
          accessibilityState={{
            disabled: rest.isDisabled,
            checked: isRadioChecked,
          }}
          accessibilityHint={rest.accessibilityHint}
        >
          <Stack
            spacing={rest.spacing || atoms.container.spacing}
            direction="horizontal"
          >
            <Center {...atoms.outerBox}>
              <Box {...atoms.innerBox} />
            </Center>
            {!!children && <Text {...atoms.text}>{children}</Text>}
          </Stack>
        </Pressable>
      );
    }
  )
);

export type RadioProps = React.ComponentProps<typeof Radio>;

Radio.displayName = "Radio";

export default Radio;
