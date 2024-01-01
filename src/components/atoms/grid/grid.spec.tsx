import React from "react";
import { render } from "@testing-library/react-native";
import Grid from "./grid";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Box from "../box/box";
import Text from "../text/text";

jest.useFakeTimers();

describe("Atoms/Grid", () => {
  it("passes the snapshot test with default props", () => {
    const tree = render(
      <ThemeProvider>
        <Grid>
          <Box>
            <Text>Test</Text>
          </Box>
        </Grid>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test with custom numCols", () => {
    const tree = render(
      <ThemeProvider>
        <Grid numCols={3}>
          <Box>
            <Text>Test</Text>
          </Box>
          <Box>
            <Text>Test</Text>
          </Box>
          <Box>
            <Text>Test</Text>
          </Box>
        </Grid>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test with custom spacing", () => {
    const tree = render(
      <ThemeProvider>
        <Grid spacing="5">
          <Box>
            <Text>Test</Text>
          </Box>
        </Grid>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test with custom spacingX", () => {
    const tree = render(
      <ThemeProvider>
        <Grid spacingX="2">
          <Box>
            <Text>Test</Text>
          </Box>
        </Grid>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test with custom spacingY", () => {
    const tree = render(
      <ThemeProvider>
        <Grid spacingY="2">
          <Box>
            <Text>Test</Text>
          </Box>
        </Grid>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
