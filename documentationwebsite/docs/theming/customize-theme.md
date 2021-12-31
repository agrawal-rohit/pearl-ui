---
sidebar_position: 2
title: Customize Theme
---

By default, all Pearl UI components inherit values from the default theme. In some scenarios, you might need to customize the theme to match your app's design requirements.

Pearl UI allows you to fully:

- Customize the theme tokens like colors, spacing, etc.
- Customize the component styles, changing the base styles, sizes, or variants.

## Customizing theme tokens

To extend or override tokens in the default theme, import the `extendTheme` function and add the keys you'd like to override. You can also add new values to the theme.

For example, if you'd like to update the colors in the theme to include your brand colors, here's what you'll do:

```jsx
// 1. Import `extendTheme`
import { extendTheme, ThemeProvider, Box } from "pearl-ui";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  palette: {
    primary: {
      100: "#123312",
      // ...
      900: "#442441",
    },

    tertiary: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },

  spacing: {
    "3xs": 1,
    "2xs": 2,
    xs: 3,
    // ...
    "3xl": 98,
  },
});

function App() {
  return (
    // 3. Pass the new theme to `ThemeProvider`
    <ThemeProvider theme={theme}>
      {/* 4. Now you can use these colors in your components */}
      <Box bg="tertiary.100" p="3xs">
        I'm a tertiary box!
      </Box>
    </ThemeProvider>
  );
}
```

## Customizing component styles

Creating, managing, and customizing components in a scalable manner as your project evolves can be extremely challenging. It usually requires a lot of developer expertise and constant refactoring, which eventually reduce delivery speed for your application.

In order to deal with this, Pearl UI provides a rich styling API that allows you to style your components through the following approaches:

<br />

1. **[Style Props](../core-features/style-props):** Add styles to a component by passing in style properties as component props.

```jsx
<Box
  backgroundColor="neutral.100"
  width="40%"
  height={200}
  borderStyle="solid"
  borderWidth={2}
  borderColor="tomato"
  borderRadius="l"
/>
```

<br />

2. **[StyleSheets](https://reactnative.dev/docs/stylesheet):** The _de facto_ approach for styling components in React Native.

```jsx
import { StyleSheet } from "react-native";

<Box style={styles.box} />;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
});
```

<br />

3. **[Component Style Config](#component-style-config):** This approach is heavily inspired from the `styleConfig` API implemented in [Chakra UI](https://chakra-ui.com/docs/theming/component-style). It provides a consistent API that allows component styling through a single JSON file, thus making it easy to understand and maintain.

```jsx
<Button size="s" variant="outline" />
```

<br />

### Component Style Config

The Component Config API provides a standard format for specifying styles for a component that scales with your project. The main idea is most components have default or base styles, styles for different sizes (e.g. small, medium, large), and styles for different visual variants ((e.g. outline, solid, ghost)), and a `defaults` to denote the default size or variant.

#### Atomic component config

An atomic component is analogous to an **Atom** in the [Atomic Design](../getting-started/introduction#atoms-and-molecules) methodology. Most components available in Pearl UI today are atomic components (e.g. Text, Spinner, Icon, etc.), and use the [useAtomicComponentConfig](../hooks/useAtomicComponentConfig) hook to enable their respective **component style configuration**.

The component config format for an atomic component is as follow:

```js
export default {
  // Base styles that are common to all sizes/variants
  baseStyle: {},
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {},
  // The default `size` or `variant` values
  defaults: {},
};
```

An example of the atomic component config applied to the [Icon](../components/media/Icon) component is given below:

```js
const newIconConfig = {
  // The styles all icons have in common
  baseStyle: {
    color: {
      light: "neutral.900", // <-- The color of the icon when the app is in light mode
      dark: "neutral.100", // <-- The color of the icon when the app is in dark mode
    },
  },
  // Four sizes: s, m, l, and xl
  sizes: {
    s: {
      size: 15, // <-- Not a style prop, so it is passed directly to the ExpoIcons component used in the Pearl UI Icon component
    },
    m: {
      size: 20,
    },
    l: {
      size: 25,
    },
    xl: {
      size: 30,
    },
  },
  // Three variants: neutral, primary, and secondary
  variants: {
    neutral: {}, // <-- Since this is empty, it uses the baseStyle configuration
    primary: {
      color: "primary.500", // <-- Overwrites the baseStyle configuration to always keep the color as 'primary.500'
    },
    secondary: {
      color: "secondary.500", // <-- Overwrites the baseStyle configuration to always keep the color as 'secondary.500'
    },
  },
  // The default size and variant values
  defaults: {
    size: "m",
    variant: "neutral",
  },
};
```

For the final step, update the theme to include this new component configuration as follows:

```js
import { extendTheme } from "pearl-ui";

const theme = extendTheme({
  components: {
    Icon: newIconConfig,
  },
});
```

That's all you have to do! Now, when you use the Icon component, these updates will be automatically applied:

```jsx
<Box flexDirection="row" justifyContent="space-between">
  <Icon iconFamily="Entypo" iconName="cup" size="s" variant="neutral" />
  <Icon iconFamily="Entypo" iconName="cup" size="m" variant="primary" />
  <Icon iconFamily="Entypo" iconName="cup" size="xl" variant="secondary" />
</Box>
```

<div
  style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }}
>
  <img src="/img/component_styles_icon_light.png" alt="welcome" width="40%" />
  <img src="/img/component_styles_icon_dark.png" alt="welcome" width="40%" />
</div>

<br />

<div
  style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }}
>
  <h6>Light Mode</h6>
  <h6>Dark Mode</h6>
</div>

#### Molecular component config

A molecular component is analogous to a **Molecule** in the [Atomic Design](../getting-started/introduction#atoms-and-molecules) methodology. Many components used in an actual app are molecular components (eg. Button, Datepicker, Modal, etc), and use the [useMolecularComponentConfig](../hooks/useMolecularComponentConfig) hook to enable their respective **component style configuration**.

The component config format for a molecular component is as follow:

```js
export default {
  // The parts of the component
  parts: [],
  // Base styles that are common to all sizes/variants
  baseStyle: {},
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {},
  // The default `size` or `variant` values
  defaults: {},
};
```

An example of a molecular component config applied to the [Button](../components/forms/Button) component is given below:

```js
const newButtonConfig = {
  // Define the parts you want to use
  parts: ["root", "text", "spinner", "icon"],
  // The baseStyle config for all parts
  baseStyle: {
    // The styles all root parts would have in common
    root: {
      margin: "2xs",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  // Two sizes: s and m
  sizes: {
    // Styles for all parts when the molecular component has size 's'
    s: {
      root: {
        py: "xs",
        px: "xs",
        borderRadius: "s",
      },
      text: {
        variant: "btn3",
      },
      spinner: {
        size: "m",
      },
      icon: {
        size: "m",
      },
    },
    // Styles for all parts when the molecular component has size 'm'
    m: {
      root: {
        py: "s",
        px: "s",
        borderRadius: "m",
      },
      text: {
        variant: "btn2",
      },
      spinner: {
        size: "m",
      },
      icon: {
        size: "m",
      },
    },
  },
  // Two variants: filled and outline
  variants: {
    // Styles for all parts when the molecular component has variant 'filled'
    opaque: {
      root: {
        backgroundColor: "primary.500",
      },
      text: { color: "neutral.100" },
      spinner: {
        color: "neutral.100",
      },
      icon: {
        color: "neutral.100",
      },
    },
    // Styles for all parts when the molecular component has variant 'outline'
    hollow: {
      root: {
        backgroundColor: {
          light: "neutral.100",
          dark: "neutral.800",
        },
        borderWidth: 1,
        borderColor: "primary.500",
      },
      text: { color: "primary.500" },
      spinner: {
        color: "primary.500",
      },
      icon: {
        color: "primary.500",
      },
    },
  },
  // The default size and variant values for the molecular component
  defaults: {
    size: "m",
    variant: "opaque",
  },
};
```

For the final step, update the theme to include this new component configuration as follows:

```js
import { extendTheme } from "pearl-ui";

const theme = extendTheme({
  components: {
    Button: newButtonConfig,
  },
});
```

That's it! Now, when you use the Button component, these updates will be automatically applied:

```jsx
<Button size="s" variant="opaque">Small Opaque button</Button>
<Button size="m" variant="hollow">Medium Hollow button</Button>
```
