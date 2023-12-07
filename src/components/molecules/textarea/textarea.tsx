import React from "react";
import Input, { InputProps } from "../input/input";
import _ from "lodash";
import { Platform } from "react-native";

export type TextareaProps = Omit<
  InputProps,
  "inputMode" | "leftIcon" | "rightIcon" | "hasClearButton"
> & {
  /**
   * Number of rows in the text area.
   *
   * @default 4
   */
  rows?: number;
};

/** The Textarea component is a component that is used to add multiline support for text inputs. **/
const Textarea = React.memo(
  React.forwardRef(({ rows = 4, ...rest }: TextareaProps, textareaRef: any) => {
    return (
      <Input
        multiline
        inputMode="text"
        textAlignVertical="top"
        ref={textareaRef}
        numberOfLines={rows}
        height={Platform.OS !== "android" ? 100 : undefined}
        {...rest}
      />
    );
  })
);

Textarea.displayName = "Textarea";

export default Textarea;
