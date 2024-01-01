import React from "react";
import { render } from "@testing-library/react-native";
import Alert from "./alert";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Text from "../../atoms/text/text";

jest.useFakeTimers();

describe("Molecules/Alert", () => {
  it("passes the snapshot test with default props", () => {
    const tree = render(
      <ThemeProvider>
        <Alert>
          <Text>Test</Text>
        </Alert>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test with title prop", () => {
    const tree = render(
      <ThemeProvider>
        <Alert title="Test Title">
          <Text>Test</Text>
        </Alert>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test with description prop", () => {
    const tree = render(
      <ThemeProvider>
        <Alert description="Test Description">
          <Text>Test</Text>
        </Alert>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test with withCloseButton prop", () => {
    const tree = render(
      <ThemeProvider>
        <Alert withCloseButton>
          <Text>Test</Text>
        </Alert>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
