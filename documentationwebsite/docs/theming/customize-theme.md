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
import { extendTheme, ThemeProvider, Box } from "pearl-ui"

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
    xxxs: 1,
    xxs: 2,
    xs:3,
    // ...
    xxxl: 98
  }
})

// 3. Pass the new theme to `ChakraProvider`
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>

// 4. Now you can use these colors in your components
function Usage() {
  return <Box bg="tertiary.100" p="xxxs">I'm a tertiary box!</Box>
}

```

## Customizing component styles

The approach for styling components in Pearl UI is heavily inspired from [Chakra UI](https://chakra-ui.com/docs/theming/customize-theme#customizing-component-styles). The main idea is most components have default or base styles (`baseStyle`), styles for different sizes (`sizes`), and styles for different visual variants (`variants`), and a `defaults` to denote the default size or variant.

Here's what the component style object looks like:

```js
const ComponentStyle = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("s", "m", "l")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {},
  // default values for `size` and `variant`
  defaults: {
    size: "",
    variant: "",
  },
};
```

For example, let's override the component styles for Pearl UI's [Screen](../components/atoms/Screen) component.

```js
// theme.js
import { extendTheme } from "pearl-ui";

const theme = extendTheme({
  components: {
    Screen: {
      // 1. We can update the base styles
      baseStyle: {
        backgroundColor: {
          light: "neutral.300", // Normally, it is "neutral.100"
          dark: "neutral.700", // Normally, it is "neutral.800"
        },
      },
      // 2. We can add a new size or extend existing
      sizes: {
        half: {
          flex: 0.5,
        },
        full: {
          flex: 1,
        },
      },
      // 3. We can add a new visual variant
      variants: {
        normal: {},
        "with-padding": {
          padding: "m",
        },
      },
      // 4. We can specify the default size and variant
      defaults: {
        size: "full",
        variant: "normal",
      },
    },
  },
});

export default theme;
```

That's all you have to do! When you use the Screen from Pearl UI, these updates will be automatically applied:

```jsx
import { Screen } from "pearl-ui";

<Screen size="half" variant="with-padding">
  This is my custom screen
</Screen>;
```
