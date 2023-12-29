import React from "react";
import { render } from "@testing-library/react-native";
import List from "./list";
import { ThemeProvider } from "../../../theme/src/theme-context";

jest.useFakeTimers();

describe("Atoms/List", () => {
  it("passes the snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <List></List>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
