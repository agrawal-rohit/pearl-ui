---
sidebar_position: 10
title: pearlify
---

`pearlify` is a custom hook to convert a third-party component to a Pearl UI-supported component that can be configured using [style props](../core-features/style-props), an [atomic component configuration](../theming/customize-theme#atomic-component-config) or a [molecular component configuration](../theming/customize-theme#molecular-component-config).

## Import

```js
import { pearlify } from "pearl-ui";
```

## Return value

`pearlify` returns the passed-in component that expects Pearl supported [style props](../core-features/style-props).

## Usage

`pearlify` can be used as a typical Higher-Order-Component in React. It expects any React component to act as the base component upon which the Pearl UI functionality is to applied. It also expects a `config` object to specify the level of features you want to add, and supported the following values:

- **componentName:** The name of the component as it would appear in the components section in the active theme. _(This value is only relevant when the `type` property is set to <t>"atom"</t> or <t>"molecule"</t>)_.
- **type:** Specifies the level of pearlification to apply to the component. It expects the following values:

  1. **basic**: Simply adds the ability to pass style props to provided component. By default, it expects all the style props supported by [Box](../components/layout/Box), however, you can specifiy which style props you'd like to use with the help of the `styleFunctions` prop.

  2. **atom**: In addition to style props, this value registers the provided component as a Pearl UI atom that allows you to control it's behaviour using an [atomic component configuration](../theming/customize-theme#atomic-component-config).

  3. **molecule**: In addition to style props, this value registers the provided component as a Pearl UI molecule that allows you to control it's behaviour using a [molecular component configuration](../theming/customize-theme#molecular-component-config).

### Basic Usage

```tsx
import { View } from "react-native";

const PearlifyViewComponent = ({ children, ...props }) => {
  const PearlView = pearlify(View, {
    componentName: "PearlView",
    type: "basic",
  });

  return <PearlView {...props}>{children}</PearlView>;
};
```

### Custom Atom

```tsx
import { View } from "react-native";

const newTheme = extendTheme({
  components: {
    TestView: {
      baseStyle: {
        width: 200,
        height: 200,
        backgroundColor: "danger.400",
        boxShadow: "4xl",
      },
      variants: {
        pink: {
          backgroundColor: "pink",
        },
        blue: {
          backgroundColor: "blue",
        },
      },
      defaults: {
        variants: "pink",
      },
    },
  },
});

const PearlifyViewComponent = ({ children, ...props }) => {
  const PearlView = pearlify(View, {
    componentName: "TestView",
    type: "atom",
  });

  return <PearlView {...props}>{children}</PearlView>;
};

const App = () => {
  return (
    <ThemeProvider theme={newTheme}>
      <PearlifyViewComponent variant="blue"></PearlifyViewComponent>
    </ThemeProvider>
  );
};
```

### Custom Molecule

```tsx
import { View } from "react-native";

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
      variants: {
        blackAndWhite: {
          root: {
            backgroundColor: "neutral.900",
          },
          box1: {
            backgroundColor: "neutral.50",
          },
        },
        green: {
          root: {
            backgroundColor: "success.500",
          },
          box1: {
            backgroundColor: "success.100",
          },
        },
      },
      defaults: {
        variants: "blackAndWhite",
      },
    },
  },
});

const PearlifyViewComponent = ({ children, ...props }) => {
  const MoleculeRender = (props) => {
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

const App = () => {
  return (
    <ThemeProvider theme={newTheme}>
      <PearlifyViewComponent variant="green"></PearlifyViewComponent>
    </ThemeProvider>
  );
};
```

## Parameters

| Name             | Required | Type                                                                  | Defaults                                                           | Description                                                                                        |
| ---------------- | -------- | --------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `Component`      | true     | <t>React.Component</t>                                                |                                                                    | The base component on which the pearlification has to be applied.                                  |
| `config`         | true     | <t>{componentName: string, type: "basic" \| "atom" \| "molecule"}</t> |                                                                    | A configuration object that adds metadata to a component that's required by Pearl UI.              |
| `styleFunctions` | false    | <t>Array of [Style Functions](../others/style-functions)</t>          | [boxStyleFunctions](../others/style-functions#box-style-functions) | List of [style functions](../others/style-functions) to use for computing the received style props |
