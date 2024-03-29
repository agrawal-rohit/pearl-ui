import React from "react";
import Text from "../../components/atoms/text/text";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../theme/src/theme-context";
import { useAccessibleColor } from "../useAccessibleColor";

jest.useFakeTimers();

const TestComponent: React.FC<any> = (props: any) => {
  const accessibleColor = useAccessibleColor(props.bgColor);

  return <Text>{accessibleColor}</Text>;
};

describe("useAccessibleColor", () => {
  it("shows the correct color for theme colors (light bg)", () => {
    const comp = render(
      <ThemeProvider>
        <TestComponent bgColor="neutral.50" />
      </ThemeProvider>
    );

    expect(comp.getByText("black")).toBeTruthy();
  });

  it("shows the correct color for theme colors (dark bg)", () => {
    const comp = render(
      <ThemeProvider>
        <TestComponent bgColor="neutral.900" />
      </ThemeProvider>
    );

    expect(comp.getByText("white")).toBeTruthy();
  });

  it("shows the correct color for named colors", () => {
    const comp = render(
      <ThemeProvider>
        <TestComponent bgColor="navy" />
      </ThemeProvider>
    );

    expect(comp.getByText("white")).toBeTruthy();
  });

  it("shows the correct color for raw hex colors", () => {
    const comp = render(
      <ThemeProvider>
        <TestComponent bgColor="#000300" />
      </ThemeProvider>
    );

    expect(comp.getByText("white")).toBeTruthy();
  });
});
