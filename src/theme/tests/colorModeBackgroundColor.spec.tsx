import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "../src/themeContext";
import Box from "../../components/Atoms/Box/Box";
import { baseTheme } from "../src/base/index";

jest.useFakeTimers();

describe("Color mode based color", () => {
  it("uses the light value in light theme", () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <Box
            shadowColor={{
              light: "blue",
              dark: "brown",
            }}
            borderColor={{
              light: "tomato",
              dark: "cyan",
            }}
            backgroundColor={{
              light: "white",
              dark: "black",
            }}
          />
        </ThemeProvider>
      )
      .toJSON();

    expect((tree as any).children[0].props.style.shadowColor).toBe(
      baseTheme.palette.blue
    );
    expect((tree as any).children[0].props.style.borderColor).toBe(
      baseTheme.palette.tomato
    );
    expect((tree as any).children[0].props.style.backgroundColor).toBe(
      baseTheme.palette.white
    );
  });

  it("uses the light value in light theme", () => {
    const tree = renderer
      .create(
        <ThemeProvider initialColorMode="dark">
          <Box
            shadowColor={{
              light: "blue",
              dark: "brown",
            }}
            borderColor={{
              light: "tomato",
              dark: "cyan",
            }}
            backgroundColor={{
              light: "white",
              dark: "black",
            }}
          />
        </ThemeProvider>
      )
      .toJSON();

    expect((tree as any).children[0].props.style.shadowColor).toBe(
      baseTheme.palette.brown
    );
    expect((tree as any).children[0].props.style.borderColor).toBe(
      baseTheme.palette.cyan
    );
    expect((tree as any).children[0].props.style.backgroundColor).toBe(
      baseTheme.palette.black
    );
  });
});
