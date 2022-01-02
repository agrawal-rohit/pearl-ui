import React from "react";
import Screen from "./Screen";
import { act, fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/themeContext";
import Box from "../Box/Box";
import Text from "../Text/Text";

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
