import React from "react";
import Button from "./Button";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/themeContext";
import Icon from "../../Atoms/Icon/Icon";

jest.useFakeTimers();

describe("Atoms/Button", () => {
  it("passes the snapshot test for basic setup", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <Button onPress={onPress}>Button press</Button>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different sizes", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <Button onPress={onPress} size="xs">
          Button press
        </Button>
        <Button onPress={onPress} size="s">
          Button press
        </Button>
        <Button onPress={onPress} size="m">
          Button press
        </Button>
        <Button onPress={onPress} size="l">
          Button press
        </Button>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different variants", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <Button onPress={onPress} variant="filled">
          Button press
        </Button>
        <Button onPress={onPress} variant="outline">
          Button press
        </Button>
        <Button onPress={onPress} variant="ghost">
          Button press
        </Button>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different icons", async () => {
    const tree = await render(
      <ThemeProvider>
        <Button leftIcon={<Icon iconFamily="AntDesign" iconName="heart" />}>
          Button with left icon
        </Button>

        <Button
          variant="outline"
          rightIcon={<Icon iconFamily="AntDesign" iconName="cloudupload" />}
        >
          Button with right icon
        </Button>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for loading state", async () => {
    const tree = await render(
      <ThemeProvider>
        <Button isLoading>Basic loading button</Button>

        <Button isLoading loadingText="Loading">
          Button with loading text
        </Button>

        <Button isLoading loadingText="Loading" spinnerPlacement="end">
          Button with spinner at the end
        </Button>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different color schemes", async () => {
    const tree = await render(
      <ThemeProvider>
        <Button colorScheme="primary">Primary button</Button>
        <Button colorScheme="secondary">Secondary button</Button>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when using style props", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <Button
          onPress={onPress}
          backgroundColor="primary.500"
          borderColor="neutral.400"
          borderWidth={2}
          androidRippleConfig={{ color: "red" }}
        >
          Button press
        </Button>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("captures the onPress event", async () => {
    const onPress = jest.fn();

    const { getByTestId } = await render(
      <ThemeProvider>
        <Button onPress={onPress} testID="testOnPress">
          Button press
        </Button>
      </ThemeProvider>
    );

    const pressableInstance = getByTestId("testOnPress");
    fireEvent.press(pressableInstance);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("doesn't capture the onPress event when the button is disabled ", async () => {
    const onPress = jest.fn();

    const { getByTestId } = await render(
      <ThemeProvider>
        <Button onPress={onPress} isDisabled testID="testOnPress">
          Button press
        </Button>
      </ThemeProvider>
    );

    const pressableInstance = getByTestId("testOnPress");
    fireEvent.press(pressableInstance);
    expect(onPress).toHaveBeenCalledTimes(0);
  });

  it("doesn't capture the onPress event when the button is in loading state ", async () => {
    const onPress = jest.fn();

    const { getByTestId } = await render(
      <ThemeProvider>
        <Button onPress={onPress} isLoading testID="testOnPress">
          Button press
        </Button>
      </ThemeProvider>
    );

    const pressableInstance = getByTestId("testOnPress");
    fireEvent.press(pressableInstance);
    expect(onPress).toHaveBeenCalledTimes(0);
  });
});
