import React from "react";
import Skeleton from "./skeleton";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";

jest.useFakeTimers();

describe("Atoms/Skeleton", () => {
  it("passes the snapshot test", () => {
    const component = render(
      <ThemeProvider>
        <Skeleton />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it("should render with default props", () => {
    const component = render(
      <ThemeProvider>
        <Skeleton />
      </ThemeProvider>
    );
    expect(component).toBeTruthy();
  });

  it("should render with custom props", () => {
    const component = render(
      <ThemeProvider>
        <Skeleton
          startColor="neutral.100"
          endColor="neutral.200"
          isLoaded={false}
          speed={800}
          fadeDuration={200}
        />
      </ThemeProvider>
    );
    expect(component).toBeTruthy();
  });
});
