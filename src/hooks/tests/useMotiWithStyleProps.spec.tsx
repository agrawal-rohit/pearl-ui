import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../theme/src/theme-context";
import { allStyleFunctions } from "../../theme/src/style-functions";
import { useMotiWithStyleProps } from "../useMotiWithStyleProps";
import { MotiView } from "moti";

jest.useFakeTimers();

const TestComponent: React.FC<any> = (props: any) => {
  const rest = useMotiWithStyleProps(props.object, allStyleFunctions);

  return <MotiView {...rest}></MotiView>;
};

describe("useMotiWithStyleProps", () => {
  it("transforms Moti 'from' props correctly", () => {
    const comp = render(
      <ThemeProvider>
        <TestComponent object={{ from: { backgroundColor: "pink", p: "s" } }} />
      </ThemeProvider>
    );

    const tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("transforms Moti 'animate' props correctly", () => {
    const comp = render(
      <ThemeProvider>
        <TestComponent
          object={{ animate: { backgroundColor: "pink", p: "s" } }}
        />
      </ThemeProvider>
    );

    const tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("transforms Moti 'exit' props correctly", () => {
    const comp = render(
      <ThemeProvider>
        <TestComponent object={{ exit: { backgroundColor: "pink", p: "s" } }} />
      </ThemeProvider>
    );

    const tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("transforms Moti 'transition' props correctly", () => {
    const comp = render(
      <ThemeProvider>
        <TestComponent object={{ transition: { type: "timing" } }} />
      </ThemeProvider>
    );

    const tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("transforms Moti 'exitTransition' props correctly", () => {
    const comp = render(
      <ThemeProvider>
        <TestComponent object={{ exitTransition: { type: "timing" } }} />
      </ThemeProvider>
    );

    const tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("transforms Moti 'state' props correctly", () => {
    const comp = render(
      <ThemeProvider>
        <TestComponent
          object={{
            state: {
              from: { backgroundColor: "pink", p: "s" },
              to: { backgroundColor: "silver", p: "xs" },
            },
          }}
        />
      </ThemeProvider>
    );

    const tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
