import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "../../../theme/src/themeContext";
import Spinner from "./Spinner";

jest.useFakeTimers();

describe("Atoms/Spinner", () => {
  it("doesn't render when not loading", () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <Spinner isLoading={false} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toBe(null);
  });

  it("renders when loading", () => {
    let comp;
    renderer.act(() => {
      comp = renderer.create(
        <ThemeProvider>
          <Spinner />
        </ThemeProvider>
      );
    });
    const tree = comp.toJSON();
    expect(tree.children.length).toBe(1);
  });
});
