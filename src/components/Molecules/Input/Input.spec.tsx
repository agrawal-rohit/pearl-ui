import React, { createRef } from "react";
import Input from "./Input";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/themeContext";
import Icon from "../../Atoms/Icon/Icon";
import { baseTheme } from "../../../theme/src/base/index";

jest.useFakeTimers();

describe("Molecules/Input", () => {
  it("passes the snapshot test for basic setup", async () => {
    const tree = await render(
      <ThemeProvider>
        <Input placeholder="This is a placeholder" />
      </ThemeProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different sizes", async () => {
    const tree = await render(
      <ThemeProvider>
        <Input size="xs" />
        <Input size="s" />
        <Input size="m" />
        <Input size="l" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different variants", async () => {
    const tree = await render(
      <ThemeProvider>
        <Input variant="filled" />
        <Input variant="outline" />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when in focused state", async () => {
    const focusBorderColor = "primary.500";
    const focusBackgroundColor = "neutral.800";

    const tree = await render(
      <ThemeProvider>
        <Input
          autoFocus
          focusBackgroundColor={focusBackgroundColor}
          focusBorderColor={focusBorderColor}
        />
      </ThemeProvider>
    ).toJSON();

    expect(tree?.props.style.focusBorderColor).toEqual(
      (baseTheme.palette.primary as any)["500"]
    );
    expect(tree?.props.style.focusBackgroundColor).toEqual(
      (baseTheme.palette.neutral as any)["800"]
    );
  });

  it("passes the snapshot test when in an error state ", async () => {
    const errorBorderColor = "danger.500";
    const errorBackgroundColor = "neutral.300";

    const tree = await render(
      <ThemeProvider>
        <Input
          isErrorVisible
          errorBackgroundColor={errorBackgroundColor}
          errorBorderColor={errorBorderColor}
        />
      </ThemeProvider>
    ).toJSON();

    expect(tree?.props.style.errorBorderColor).toEqual(
      (baseTheme.palette.danger as any)["500"]
    );
    expect(tree?.props.style.errorBackgroundColor).toEqual(
      (baseTheme.palette.neutral as any)["300"]
    );
  });

  it("passes the snapshot test for different icons", async () => {
    const tree = await render(
      <ThemeProvider>
        <Input leftIcon={<Icon iconFamily="AntDesign" iconName="heart" />} />

        <Input
          variant="outline"
          rightIcon={<Icon iconFamily="AntDesign" iconName="cloudupload" />}
        />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when using style props", async () => {
    const tree = await render(
      <ThemeProvider>
        <Input
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
        <Input
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
        <Input onChangeText={onChangeText} isDisabled testID="inputField" />
      </ThemeProvider>
    );

    const input = getByTestId("inputField");
    fireEvent.changeText(input, "new value");

    expect(queryByText("new value")).toBeNull();
  });

  it("shows error message correctly", () => {
    const value = "start value";

    const { getByText } = render(
      <ThemeProvider>
        <Input
          placeholder="Enter value"
          value={value}
          isErrorVisible
          errorMessage="Test error message"
        />
      </ThemeProvider>
    );

    expect(getByText("Test error message")).toBeTruthy();
  });
});
