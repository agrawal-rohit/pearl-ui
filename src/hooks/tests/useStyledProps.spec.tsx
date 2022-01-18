import React, { useState } from "react";
import Text from "../../components/Atoms/Text/Text";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../theme/src/themeContext";
import Box from "../../components/Atoms/Box/Box";
import { useStyleProps } from "../useStyleProps";
import { allStyleFunctions } from "../../theme/src/styleFunctions";
import { getKeys } from "../../theme/utils/typeHelpers";

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
        <TestComponent object={{ backgroundColor: "pink", p: "s" }} />
      </ThemeProvider>
    );

    const tree = comp.toJSON();

    expect(tree).toMatchSnapshot();
    expect(comp.getByText("3")).toBeTruthy();
  });
});
