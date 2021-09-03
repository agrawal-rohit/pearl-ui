import React from "react";
import Box from "./Box";
import { ThemeProvider } from "@shopify/restyle";
import theme from "../../theme";
import renderer from "react-test-renderer";

describe("<Box />", () => {
  it("exists", () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Box>asdasd</Box>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
