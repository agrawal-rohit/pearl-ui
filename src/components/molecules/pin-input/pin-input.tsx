import React, { useRef, useEffect, useState } from "react";
import { isArray } from "lodash";
import { HStack, StackProps } from "../../atoms/stack/stack";
import { pearl } from "../../../pearl";
import { MoleculeComponentProps } from "../../../theme/src/types";
import { PinInputAtoms } from "./pin-input.config";
import Input, { InputProps } from "../input/input";

export type BasePinInputProps = StackProps &
  InputProps & {
    /**
     * Number of input fields to include in the pin input.
     *
     * @default 4
     */
    numFields?: number;
    /**
     * If true, focus will move automatically to the next input once filled.
     *
     * @default true
     */
    manageFocus?: boolean;
    /**
     * The type of values the pin-input should allow.
     *
     * @default "number"
     */
    type?: "number" | "alphanumeric";
    /**
     * Function called when all inputs have valid values.
     */
    onComplete?: (value: string) => void;
  };

const BasePinInput = React.memo(
  React.forwardRef(
    (
      {
        children,
        atoms,
      }: MoleculeComponentProps<"PinInput", BasePinInputProps, PinInputAtoms>,
      ref: any
    ) => {
      const {
        value,
        placeholder,
        autoFocus = false,
        numFields = 4,
        manageFocus = true,
        type = "number",
        onChangeText = () => {},
        onComplete = () => {},
        ...restInputProps
      } = atoms.input;
      const inputRefs = useRef<any[]>([]);
      const [pinValues, setPinValues] = useState<string[]>(
        Array(numFields).fill("")
      );

      useEffect(() => {
        if (value) {
          let paddedValue = value.split("");
          while (paddedValue.length < numFields) {
            paddedValue.push("");
          }
          setPinValues(paddedValue);
        }

        if (children && isArray(children))
          inputRefs.current = inputRefs.current.slice(0, children.length);
      }, [children, value]);

      // Function to handle key press in the input fields
      const handleOnKeyPress = (index: number, event: any) => {
        if (!manageFocus) return;

        // If the key pressed is a valid value and there is a next input field, focus it
        if (
          event.nativeEvent.key !== "Backspace" &&
          inputRefs.current[index + 1] &&
          (type !== "number" ||
            (type === "number" && !Number.isNaN(Number(event.nativeEvent.key))))
        ) {
          inputRefs.current[index + 1].focus();
        }

        // If the key pressed is the Backspace and there is a previous input field, focus it
        else if (
          event.nativeEvent.key === "Backspace" &&
          inputRefs.current[index - 1]
        ) {
          inputRefs.current[index - 1].focus();
        }
      };

      // Function to handle text changes in the input fields
      const handleOnChangeText = (index: number, value: string) => {
        // Update the value at the current index
        let newPinValues = [...pinValues];
        if (type === "number" && Number.isNaN(Number(value))) return;
        newPinValues[index] = value;

        // If the value becomes "", then replace the pinValues value with "" at the index
        if (value === "") newPinValues[index] = "";

        setPinValues(newPinValues);

        // If all input fields have values, call the onComplete function
        if (newPinValues.every((val) => val !== "")) {
          onComplete(newPinValues.join(""));
        }

        // If an onChangeText function is provided, call it with the current pin values
        onChangeText(newPinValues.join(""));
      };

      return (
        <HStack {...atoms.container} ref={ref}>
          {[...Array(numFields).keys()].map((fieldIdx) => {
            return (
              <Input
                maxLength={1}
                key={fieldIdx}
                keyboardType={type === "number" ? "numeric" : "default"}
                autoFocus={!!autoFocus && fieldIdx === 0 ? true : false}
                {...restInputProps}
                placeholder="O"
                ref={(el: any) => (inputRefs.current[fieldIdx] = el)}
                onChangeText={(value: string) =>
                  handleOnChangeText(fieldIdx, value)
                }
                onKeyPress={(e) => handleOnKeyPress(fieldIdx, e)}
                value={pinValues[fieldIdx]}
              />
            );
          })}
        </HStack>
      );
    }
  )
);

/**
 * Similar to the Input component, but is optimized for entering sequences of digits quickly.
 */
const PinInput = pearl<BasePinInputProps, "molecule">(
  BasePinInput,
  {
    componentName: "PinInput",
    type: "molecule",
    animatable: true,
  },
  undefined,
  {
    partForOverridenStyleProps: "container",
    partForOverridenNativeProps: "input",
    partForOverridenAnimationProps: "container",
  }
);

export type PinInputProps = React.ComponentProps<typeof PinInput>;

PinInput.displayName = "PinInput";

export default PinInput;
