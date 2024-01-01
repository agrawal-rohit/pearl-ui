import React from "react";
import Skeleton from "./skeleton";
import SkeletonCircle from "./skeleton-circle";
import SkeletonText from "./skeleton-text";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";
import { Text } from "react-native";

jest.useFakeTimers();

describe("Atoms/Skeleton", () => {
  it("passes the snapshot test", () => {
    const component = render(
      <ThemeProvider>
        <Skeleton>
          <Text>Test</Text>
        </Skeleton>
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it("should render with default props", () => {
    const component = render(
      <ThemeProvider>
        <Skeleton>
          <Text>Test</Text>
        </Skeleton>
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
        >
          <Text>Test</Text>
        </Skeleton>
      </ThemeProvider>
    );
    expect(component).toBeTruthy();
  });
});

describe("Atoms/SkeletonCircle", () => {
  it("passes the snapshot test", () => {
    const component = render(
      <ThemeProvider>
        <SkeletonCircle boxSize={20} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });
});

describe("Atoms/SkeletonText", () => {
  it("passes the snapshot test", () => {
    const component = render(
      <ThemeProvider>
        <SkeletonText noOfLines={3} skeletonHeight={15} spacing="3">
          <Text>Test</Text>
        </SkeletonText>
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
