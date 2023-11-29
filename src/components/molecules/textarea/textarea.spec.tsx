import React from "react";
import Textarea from "./textarea";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Icon from "../../atoms/icon/icon";

jest.useFakeTimers();

describe("Molecules/Textarea", () => {
  it("passes the snapshot test for basic setup", async () => {
    const tree = await render(
      <ThemeProvider>
        <Textarea placeholder="This is a placeholder" />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different sizes", async () => {
    const tree = await render(
      <ThemeProvider>
        <Textarea size="xs" />
        <Textarea size="s" />
        <Textarea size="m" />
        <Textarea size="l" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different variants", async () => {
    const tree = await render(
      <ThemeProvider>
        <Textarea variant="filled" />
        <Textarea variant="outline" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it("updates styles correctly when in an error state ", async () => {
  //   const errorBackgroundColor = "neutral.50";
  //   const errorBorderColor = "danger.800";

  //   const { getByTestId } = render(
  //     <ThemeProvider>
  //       <Textarea
  //         testID="inputField"
  //         isInvalid
  //         errorBackgroundColor={errorBackgroundColor}
  //         errorBorderColor={errorBorderColor}
  //       />
  //     </ThemeProvider>
  //   );

  //   const inputContainer = getByTestId("inputFieldContainer");
  //   expect(inputContainer.props.style.borderColor).toEqual(
  //     (baseTheme.palette.danger as any)["800"]
  //   );
  //   expect(inputContainer.props.style.backgroundColor).toEqual(
  //     (baseTheme.palette.neutral as any)["50"]
  //   );
  // });

  it("passes the snapshot test when using style props", async () => {
    const tree = await render(
      <ThemeProvider>
        <Textarea
          backgroundColor="primary.500"
          borderColor="neutral.400"
          borderWidth={2}
          isFullWidth
          placeholderTextColor={undefined}
        />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("captures onChangeText event correctly", () => {
    const value = "start value";
    const onChangeText = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider>
        <Textarea
          placeholder="Enter value"
          onChangeText={onChangeText}
          value={value}
          testID="inputField"
        />
      </ThemeProvider>
    );

    const input = getByTestId("inputField");
    fireEvent.changeText(input, "new value");

    expect(onChangeText).toBeCalledWith("new value");
  });

  it("doesn't update value when the input is disabled ", async () => {
    const onChangeText = jest.fn();

    const { getByTestId, queryByText } = await render(
      <ThemeProvider>
        <Textarea onChangeText={onChangeText} isDisabled testID="inputField" />
      </ThemeProvider>
    );

    const input = getByTestId("inputField");
    fireEvent.changeText(input, "new value");

    expect(queryByText("new value")).toBeNull();
  });
});
