import React from "react";
import Text from "../../components/atoms/text/text";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../theme/src/theme-context";
import Box from "../../components/atoms/box/box";
import { useStyleProps } from "../useStyleProps";
import { allStyleFunctions } from "../../theme/src/style-functions";
import { getKeys } from "../../theme/utils/type-helpers";

jest.useFakeTimers();

const TestComponent: React.FC<any> = (props: any) => {
  const rest = useStyleProps(props.object, allStyleFunctions);

  return (
    <Box {...rest}>
      <Text>{getKeys(rest.style).length}</Text>
    </Box>
  );
};

describe("useStyleProps", () => {
  it("return empty style object for missing props", () => {
    const comp = render(
      <ThemeProvider>
        <TestComponent object={null} />
      </ThemeProvider>
    );

    const tree = comp.toJSON();

    expect(tree).toMatchSnapshot();
    expect(comp.getByText("0")).toBeTruthy();
  });

  it("return correct style object for props", () => {
    const comp = render(
      <ThemeProvider>
        <TestComponent object={{ backgroundColor: "pink", p: "0.75" }} />
      </ThemeProvider>
    );

    const tree = comp.toJSON();

    expect(tree).toMatchSnapshot();
    expect(comp.getByText("2")).toBeTruthy();
  });
});
