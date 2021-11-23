import React from "react";
import Screen from "./Screen";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "../../../theme/src/themeContext";
import Box from "../Box/Box";
import Text from "../Text/Text";

jest.useFakeTimers();

jest.mock("react-native-keyboard-aware-scroll-view", () => {
  const KeyboardAwareScrollView = ({ children }: { children: any }) => children;
  return { KeyboardAwareScrollView };
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

  it.skip("executes the function when pull-to-refresh is performed", () => {
    const mockFn = jest.fn();

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: -600,
        },
      },
    };

    const main = render(
      <ThemeProvider>
        <Screen onPullToRefresh={mockFn}>
          <Box w={100} h={200}>
            <Text>Test</Text>
          </Box>
        </Screen>
      </ThemeProvider>
    );

    fireEvent.scroll(main.getByText("Test"), eventData);
    expect(mockFn).toHaveBeenCalled();
  });
});
