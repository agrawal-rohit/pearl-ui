import React from "react";
import IconButton from "./icon-button";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Icon from "../../atoms/icon/icon";

jest.useFakeTimers();

describe("Molecules/IconButton", () => {
  it("passes the snapshot test for basic setup", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          onPress={onPress}
        />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different sizes", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          onPress={onPress}
          size="xs"
        />
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          onPress={onPress}
          size="s"
        />
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          onPress={onPress}
          size="m"
        />
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          onPress={onPress}
          size="l"
        />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different variants", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          onPress={onPress}
          variant="filled"
        />
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          onPress={onPress}
          variant="outline"
        />
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          onPress={onPress}
          variant="ghost"
        />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different icons", async () => {
    const tree = await render(
      <ThemeProvider>
        <IconButton icon={<Icon iconFamily="AntDesign" iconName="heart" />} />
        <IconButton
          variant="outline"
          icon={<Icon iconFamily="AntDesign" iconName="cloudupload" />}
        />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for loading state", async () => {
    const tree = await render(
      <ThemeProvider>
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          isLoading
        >
          Basic loading IconButton
        </IconButton>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for different color schemes", async () => {
    const tree = await render(
      <ThemeProvider>
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          colorScheme="primary"
        />
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          colorScheme="secondary"
        />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test when using style props", async () => {
    const onPress = jest.fn();

    const tree = await render(
      <ThemeProvider>
        <IconButton
          onPress={onPress}
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          backgroundColor="primary.500"
          borderColor="neutral.400"
          borderWidth={2}
        />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("captures the onPress event", async () => {
    const onPress = jest.fn();

    const component = await render(
      <ThemeProvider>
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          onPress={onPress}
          testID="testOnPress"
        />
      </ThemeProvider>
    );

    const tree = component.toJSON();
    if ((tree as any).children[0].type !== "RNGestureHandlerButton") {
      const pressableInstance = component.getByTestId("testOnPress");
      fireEvent.press(pressableInstance);
      expect(onPress).toHaveBeenCalledTimes(1);
    }
  });

  it("doesn't capture the onPress event when the button is disabled ", async () => {
    const onPress = jest.fn();

    const component = await render(
      <ThemeProvider>
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          onPress={onPress}
          isDisabled
          testID="testOnPress"
        />
      </ThemeProvider>
    );

    const tree = component.toJSON();
    if ((tree as any).children[0].type !== "RNGestureHandlerButton") {
      const pressableInstance = component.getByTestId("testOnPress");
      fireEvent.press(pressableInstance);
      expect(onPress).toHaveBeenCalledTimes(0);
    }
  });

  it("doesn't capture the onPress event when the button is in loading state ", async () => {
    const onPress = jest.fn();

    const component = await render(
      <ThemeProvider>
        <IconButton
          icon={<Icon iconFamily="AntDesign" iconName="heart" />}
          onPress={onPress}
          isLoading
          testID="testOnPress"
        />
      </ThemeProvider>
    );

    const tree = component.toJSON();
    if ((tree as any).children[0].type !== "RNGestureHandlerButton") {
      const pressableInstance = component.getByTestId("testOnPress");
      fireEvent.press(pressableInstance);
      expect(onPress).toHaveBeenCalledTimes(0);
    }
  });
});
