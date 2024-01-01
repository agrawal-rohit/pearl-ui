import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "./theme/src/theme-context";
import { pearl } from "./pearl";
import { Text, View } from "react-native";
import { extendTheme } from "./theme/src/base/index";
import Box, { BoxProps } from "./components/atoms/box/box";

jest.useFakeTimers();

describe("pearl/basic", () => {
  const PearlViewComponent: React.FC<PropsWithChildren> = ({
    children,
    ...props
  }) => {
    const PearlView = pearl(View, {
      componentName: "TestView",
      type: "basic",
    });

    return <PearlView {...props}>{children}</PearlView>;
  };

  const PearlTextComponent: React.FC<PropsWithChildren> = ({
    children,
    ...props
  }) => {
    const PearlText = pearl(Text, {
      componentName: "TestText",
      type: "basic",
    });

    return <PearlText {...props}>{children}</PearlText>;
  };

  it("passes the snapshot test for a <View> component", () => {
    const tree = render(
      <ThemeProvider>
        <PearlViewComponent></PearlViewComponent>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for a <Text> component", () => {
    const tree = render(
      <ThemeProvider>
        <PearlTextComponent>
          <Text>asdasd</Text>
        </PearlTextComponent>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the correct children for a <View> component", () => {
    const { getByText } = render(
      <ThemeProvider>
        <PearlViewComponent>
          <Text>Test</Text>
        </PearlViewComponent>
      </ThemeProvider>
    );
    expect(getByText("Test")).toBeTruthy();
  });

  it("renders the correct children for a <Text> component", () => {
    const { getByText } = render(
      <ThemeProvider>
        <PearlTextComponent>
          <Text>Test</Text>
        </PearlTextComponent>
      </ThemeProvider>
    );
    expect(getByText("Test")).toBeTruthy();
  });
});

describe("pearl/atoms", () => {
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

  const PearlViewComponent: React.FC<PropsWithChildren> = ({
    children,
    ...props
  }) => {
    const PearlView = pearl(View, {
      componentName: "TestView",
      type: "atom",
    });

    return <PearlView {...props}>{children}</PearlView>;
  };

  const PearlTextComponent: React.FC<PropsWithChildren> = ({
    children,
    ...props
  }) => {
    const PearlText = pearl(Text, {
      componentName: "TestText",
      type: "atom",
    });

    return <PearlText {...props}>{children}</PearlText>;
  };

  it("passes the snapshot test for a <View> component", () => {
    const tree = render(
      <ThemeProvider theme={newTheme}>
        <PearlViewComponent></PearlViewComponent>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for a <Text> component", () => {
    const tree = render(
      <ThemeProvider theme={newTheme}>
        <PearlTextComponent>asdasd</PearlTextComponent>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the correct children for a <View> component", () => {
    const { getByText } = render(
      <ThemeProvider theme={newTheme}>
        <PearlViewComponent>
          <Text>Test</Text>
        </PearlViewComponent>
      </ThemeProvider>
    );
    expect(getByText("Test")).toBeTruthy();
  });

  it("renders the correct children for a <Text> component", () => {
    const { getByText } = render(
      <ThemeProvider theme={newTheme}>
        <PearlTextComponent>
          <Text>Test</Text>
        </PearlTextComponent>
      </ThemeProvider>
    );
    expect(getByText("Test")).toBeTruthy();
  });
});

describe("pearl/molecules", () => {
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

  const PearlViewComponent: React.FC<BoxProps> = ({ children, ...props }) => {
    const MoleculeRender = (props: any) => {
      return (
        <Box {...props.root}>
          <Box {...props.box1}></Box>
          <Box {...props.box2}></Box>
        </Box>
      );
    };

    const PearlView = pearl(MoleculeRender, {
      componentName: "TestView",
      type: "molecule",
    });

    return <PearlView {...props}>{children}</PearlView>;
  };

  it("passes the snapshot test for a <View> component", () => {
    const tree = render(
      <ThemeProvider theme={newTheme}>
        <PearlViewComponent></PearlViewComponent>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
