import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { ThemeProvider } from "../../../theme/themeContext";
import renderer from "react-test-renderer";
import OfflineNotice from "./OfflineNotice";

jest.useFakeTimers();
jest.mock("@react-native-community/netinfo", () => ({
  useNetInfo: jest.fn(),
}));

describe("Molecules/OfflineNotice", () => {
  afterEach(cleanup);

  it("is hidden when internet is available", () => {
    useNetInfo.mockResolvedValueOnce({
      type: "test",
      isInternetReachable: true,
    });
    const { queryByText } = render(
      <ThemeProvider>
        <OfflineNotice />
      </ThemeProvider>
    );
    expect(queryByText(/no internet connection/i)).toBeNull();
  });
});
