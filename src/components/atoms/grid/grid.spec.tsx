import React from "react";
import { render } from "@testing-library/react-native";
import Grid from "./grid";
import { ThemeProvider } from "../../../theme/src/theme-context";

jest.useFakeTimers();

describe("Atoms/Grid", () => {
  it("passes the snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <Grid></Grid>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
