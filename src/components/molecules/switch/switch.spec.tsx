import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Switch from "./switch";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Text from "../../atoms/text/text";

jest.useFakeTimers();

describe("Molecules/Switch", () => {
  it("passes the snapshot test with default props", () => {
    const tree = render(
      <ThemeProvider>
        <Switch>
          <Text>Test</Text>
        </Switch>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test with isChecked prop", () => {
    const tree = render(
      <ThemeProvider>
        <Switch isChecked>
          <Text>Test</Text>
        </Switch>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test with isDisabled prop", () => {
    const tree = render(
      <ThemeProvider>
        <Switch isDisabled>
          <Text>Test</Text>
        </Switch>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("checks if Switch is disabled", async () => {
    const onPress = jest.fn();

    const { getByTestId } = await render(
      <ThemeProvider>
        <Switch isDisabled testID="testOnPress" onPress={onPress}>
          <Text>Test</Text>
        </Switch>
      </ThemeProvider>
    );
    const switchInstance = getByTestId("testOnPress");
    fireEvent.press(switchInstance);
    expect(onPress).toHaveBeenCalledTimes(0);
  });
});
