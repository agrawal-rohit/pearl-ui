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

      // Use effect to handle changes in value and children props
      useEffect(() => {
        // If value prop is provided, split it into individual characters and set it as pinValues
        if (value) {
          let paddedValue = value.split("");
          // If the length of the value is less than numFields, pad it with empty strings
          while (paddedValue.length < numFields) {
            paddedValue.push("");
          }
          setPinValues(paddedValue);
        }

        // If children prop is provided and it is an array, adjust the length of inputRefs accordingly
        if (children && isArray(children))
          inputRefs.current = inputRefs.current.slice(0, children.length);
      }, [children, value]); // Depend on children and value props

      // Function to handle text changes in the input fields
      const handleOnChangeText = (index: number, value: string) => {
        // Update the value at the current index
        let newPinValues = [...pinValues];
        // If the type is "number" and the value is not a number, return without making changes
        if (type === "number" && Number.isNaN(Number(value))) return;
        newPinValues[index] = value;

        // If the value becomes "", then replace the pinValues value with "" at the index
        if (value === "") newPinValues[index] = "";

        // Update the state with the new pin values
        setPinValues(newPinValues);

        // If all input fields have values, call the onComplete function
        if (newPinValues.every((val) => val !== "")) {
          onComplete(newPinValues.join(""));
        }

        // If an onChangeText function is provided, call it with the current pin values
        onChangeText(newPinValues.join(""));

        // If the value becomes "", and there is a previous input field, focus it
        if (value === "" && inputRefs.current[index - 1] && manageFocus) {
          inputRefs.current[index - 1].focus();
        }

        // If the value is a valid value and there is a next input field, focus it
        else if (
          value !== "" &&
          inputRefs.current[index + 1] &&
          manageFocus &&
          (type !== "number" ||
            (type === "number" && !Number.isNaN(Number(value))))
        ) {
          inputRefs.current[index + 1].focus();
        }
      };

      // Function to handle key press events in the input fields
      const handleOnKeyPress = (index: number, event: any) => {
        // If the pressed key is "Backspace", the current field is empty, and there is a previous field, focus the previous field
        if (
          event.nativeEvent.key === "Backspace" &&
          pinValues[index] === "" &&
          inputRefs.current[index - 1] &&
          manageFocus
        ) {
          inputRefs.current[index - 1].focus();
        }
        // If the pressed key is not "Backspace", the current field is not empty, the next field is empty, and there is a next field, focus the next field
        else if (
          event.nativeEvent.key !== "Backspace" &&
          pinValues[index] !== "" &&
          pinValues[index + 1] === "" &&
          inputRefs.current[index + 1] &&
          manageFocus
        ) {
          inputRefs.current[index + 1].focus();
        }
      };

      return (
        <HStack {...atoms.container} ref={ref}>
          {[...Array(numFields).keys()].map((fieldIdx) => {
            return (
              <Input
                maxLength={1}
                key={fieldIdx}
                inputMode={type === "number" ? "numeric" : "none"}
                autoFocus={!!autoFocus && fieldIdx === 0 ? true : false}
                {...restInputProps}
                placeholder="O"
                ref={(el: any) => (inputRefs.current[fieldIdx] = el)}
                onChangeText={(value: string) =>
                  handleOnChangeText(fieldIdx, value)
                }
                onKeyPress={(event: any) => handleOnKeyPress(fieldIdx, event)}
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
