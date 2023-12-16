import React from "react";
import Screen from "./screen";
import { act, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Box from "../box/box";
import Text from "../text/text";

jest.useFakeTimers();

// jest.mock("react-native-keyboard-aware-scroll-view", () => {
//   const KeyboardAwareScrollView = ({ children }: { children: any }) => children;
//   return { KeyboardAwareScrollView };
// });

jest.mock("react-native/Libraries/Utilities/Platform", () => {
  const platform = jest.requireActual(
    "react-native/Libraries/Utilities/Platform"
  );
  return {
    ...platform,
    constants: {
      ...platform.constants,
      reactNativeVersion: {
        major: 0,
        minor: 65,
        patch: 1,
      },
    },
  };
});

describe("Atoms/Screen", () => {
  it("passes the snapshot test", () => {
    const tree = render(
      <ThemeProvider>
        <Screen></Screen>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("executes the function when pull-to-refresh is performed", async () => {
    const mockFn = jest.fn();

    const main = await render(
      <ThemeProvider>
        <Screen onPullToRefresh={mockFn} testID="scrollView">
          <Box w={100} h={200}>
            <Text>Test</Text>
          </Box>
        </Screen>
      </ThemeProvider>
    );

    const scrollView = await main.getByTestId("scrollView");
    expect(scrollView).toBeDefined();

    const { refreshControl } = scrollView.props;
    await act(async () => {
      refreshControl.props.onRefresh();
    });
    expect(mockFn).toHaveBeenCalled();
  });
});
