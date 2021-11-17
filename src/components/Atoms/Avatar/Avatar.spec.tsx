import React from "react";
import { render } from "@testing-library/react-native";
import Avatar from "./Avatar";
import { ThemeProvider } from "../../../theme/src/themeContext";

jest.useFakeTimers();

describe("Atoms/Divider", () => {
  it("passes the snapshot test in light mode", () => {
    const tree = render(
      <ThemeProvider>
        <Avatar source={{}} />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
