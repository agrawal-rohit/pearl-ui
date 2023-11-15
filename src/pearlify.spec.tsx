import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "./theme/src/theme-context";
import { pearlify } from "./pearlify";
import { Text, View } from "react-native";
import { extendTheme } from "./theme/src/base/index";
import Box, { BoxProps } from "./components/atoms/box/box";

jest.useFakeTimers();

describe("pearlify/basic", () => {
  const PearlifyViewComponent: React.FC<PropsWithChildren> = ({
    children,
    ...props
  }) => {
    const PearlView = pearlify(View, {
      componentName: "TestView",
      type: "basic",
    });

    return <PearlView {...props}>{children}</PearlView>;
  };

  const PearlifyTextComponent: React.FC<PropsWithChildren> = ({
    children,
    ...props
  }) => {
    const PearlText = pearlify(Text, {
      componentName: "TestText",
      type: "basic",
    });

    return <PearlText {...props}>{children}</PearlText>;
  };

  it("passes the snapshot test for a <View> component", () => {
    const tree = render(
      <ThemeProvider>
        <PearlifyViewComponent></PearlifyViewComponent>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for a <Text> component", () => {
    const tree = render(
      <ThemeProvider>
        <PearlifyTextComponent>asdasd</PearlifyTextComponent>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("pearlify/atoms", () => {
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

  const PearlifyViewComponent: React.FC<PropsWithChildren> = ({
    children,
    ...props
  }) => {
    const PearlView = pearlify(View, {
      componentName: "TestView",
      type: "atom",
    });

    return <PearlView {...props}>{children}</PearlView>;
  };

  const PearlifyTextComponent: React.FC<PropsWithChildren> = ({
    children,
    ...props
  }) => {
    const PearlText = pearlify(Text, {
      componentName: "TestText",
      type: "atom",
    });

    return <PearlText {...props}>{children}</PearlText>;
  };

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

describe("pearlify/molecules", () => {
  const newTheme = extendTheme({
    components: {
      TestView: {
        parts: ["root", "box1", "box2"],
        baseStyle: {
          root: {
            width: 200,
            height: 200,
            backgroundColor: "danger.400",
            boxShadow: "4xl",
            p: "4xl",
          },
          box1: {
            width: 50,
            height: 50,
            backgroundColor: "success.500",
          },
        },
      },
    },
  });

  const PearlifyViewComponent: React.FC<BoxProps> = ({
    children,
    ...props
  }) => {
    const MoleculeRender = (props: any) => {
      return (
        <Box {...props.root}>
          <Box {...props.box1}></Box>
          <Box {...props.box2}></Box>
        </Box>
      );
    };

    const PearlView = pearlify(MoleculeRender, {
      componentName: "TestView",
      type: "molecule",
    });

    return <PearlView {...props}>{children}</PearlView>;
  };

  it("passes the snapshot test for a <View> component", () => {
    const tree = render(
      <ThemeProvider theme={newTheme}>
        <PearlifyViewComponent></PearlifyViewComponent>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
