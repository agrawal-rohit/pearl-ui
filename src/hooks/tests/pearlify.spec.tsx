import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "../../theme/src/themeContext";
import { pearlify } from "../pearlify";
import { Text, View } from "react-native";
import { extendTheme } from "../../theme/src/base/index";

jest.useFakeTimers();

const newTheme = extendTheme({
  components: {
    TestView: {
      baseStyle: {
        width: 200,
        height: 200,
        backgroundColor: "danger.400",
        boxShadow: "4xl",
      },
    },
    TestText: {
      baseStyle: {
        color: "success.400",
        fontFamily: "body",
        fontWeight: "hairline",
      },
    },
  },
});

const PearlifyViewComponent: React.FC = ({ children, ...props }) => {
  const PearlView = pearlify(View, "TestView");

  return <PearlView {...props}>{children}</PearlView>;
};

const PearlifyTextComponent: React.FC = ({ children, ...props }) => {
  const PearlText = pearlify(Text, "TestText");

  return <PearlText {...props}>{children}</PearlText>;
};

describe("pearlify", () => {
  it("passes the snapshot test for a <View> component", () => {
    const tree = render(
      <ThemeProvider theme={newTheme}>
        <PearlifyViewComponent></PearlifyViewComponent>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for a <Text> component", () => {
    const tree = render(
      <ThemeProvider theme={newTheme}>
        <PearlifyTextComponent>asdasd</PearlifyTextComponent>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
