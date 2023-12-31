import React from "react";
import Box from "../../atoms/box/box";
import { MoleculeComponentProps, StateProps } from "../../../theme/src/types";
import { pearl } from "../../../pearl";
import Pressable, { PressableProps } from "../../atoms/pressable/pressable";
import { useCheckedState } from "../../../hooks";
import { boxStyleFunctions } from "../../../theme/src/style-functions";
import { SwitchAtoms } from "./switch.config";

export type BaseSwitchProps = PressableProps &
  StateProps<"_checked" | "_disabled"> & {
    /**
     * Whether the switch is in a checked state.
     *
     * @default false
     */
    isChecked?: boolean;
    /**
     * Whether the switch is disabled.
     *
     * @default false
     */
    isDisabled?: boolean;
  };

const BaseSwitch = React.memo(
  React.forwardRef(
    (
      {
        children,
        atoms,
        ...rest
      }: MoleculeComponentProps<"Switch", BaseSwitchProps, SwitchAtoms>,
      ref: any
    ) => {
      let { isChecked, isDisabled, ...otherTrackProps } = atoms.track;
      const { propsWithCheckedStyles: propsWithCheckedStylesForTrack } =
        useCheckedState(
          otherTrackProps,
          boxStyleFunctions,
          "molecule",
          true,
          isChecked
        );
      otherTrackProps = propsWithCheckedStylesForTrack;
      const { propsWithCheckedStyles: propsWithCheckedStylesForKnob } =
        useCheckedState(
          atoms.knob,
          boxStyleFunctions,
          "molecule",
          true,
          isChecked
        );
      atoms.knob = propsWithCheckedStylesForKnob;

      return (
        <Pressable
          {...(otherTrackProps as any)}
          ref={ref}
          accessible={true}
          accessibilityRole="switch"
          isDisabled={isDisabled}
          accessibilityLabel={atoms.track.accessibilityLabel}
          accessibilityState={{
            disabled: isDisabled,
            checked: isChecked,
          }}
          accessibilityHint={rest.accessibilityHint}
        >
          <Box {...atoms.knob} />
        </Pressable>
      );
    }
  )
);

/** The Progress component is a visual indicator of completion percentage. */
const Switch = pearl<BaseSwitchProps, "molecule", SwitchAtoms>(
  BaseSwitch,
  {
    componentName: "Switch",
    type: "molecule",
    animatable: true,
  },
  undefined,
  {
    partForOverridenAnimationProps: "track",
    partForOverridenNativeProps: "track",
    partForOverridenStyleProps: "track",
  }
);

export type SwitchProps = React.ComponentProps<typeof Switch>;

Switch.displayName = "Switch";

export default Switch;
