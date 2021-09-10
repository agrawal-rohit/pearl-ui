import { render } from "@testing-library/react-native";
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "../../../themeContext";
import ActivityIndicator from "./ActivityIndicator";

jest.useFakeTimers();

describe("Atoms/ActivityIndicator", () => {
  it("doesn't render when not loading", () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <ActivityIndicator loading={false} />
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
          <ActivityIndicator />
        </ThemeProvider>
      );
    });
    const tree = comp.toJSON();
    expect(tree.children.length).toBe(1);
  });
});
