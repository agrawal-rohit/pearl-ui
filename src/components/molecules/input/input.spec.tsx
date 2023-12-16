import React from "react";
import Input from "./input";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Icon from "../../atoms/icon/icon";

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

  // it("updates styles correctly when in an error state ", async () => {
  //   const errorBackgroundColor = "neutral.50";
  //   const errorBorderColor = "danger.800";

  //   const { getByTestId } = render(
  //     <ThemeProvider>
  //       <Input
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
});
