---
sidebar_position: 2
title: Installation
---

## Installation

:::info
Pearl UI is primarily designed for React Native projects that utilize [Expo](https://docs.expo.dev/)'s [managed workflow](https://docs.expo.dev/introduction/managed-vs-bare/#managed-workflow).
:::

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

To install Pearl UI in your React Native/Expo project directory, execute one of the following commands:

<Tabs
defaultValue="npm"
values={[
{ label: 'NPM', value: 'npm', },
{ label: 'Yarn', value: 'yarn', },
]
}>
<TabItem value="npm">

```bash
npm install pearl-ui
```

</TabItem>

<TabItem value="yarn">

```bash
yarn add pearl-ui
```

</TabItem>
</Tabs>

## Setting up Pearl UI

To get started with Pearl UI, you need to set up the theme provider and load the required fonts. This guide will walk you through the process.

### Setting up the Theme Provider

Pearl UI requires you to wrap your application with the `ThemeProvider` component. This component is provided by the library and ensures that all Pearl UI components have access to the theme.

To set up the `ThemeProvider`, navigate to the root of your app and modify your main component as follows:

```jsx title="App.tsx"
import * as React from 'react';

// Import the ThemeProvider component
import { ThemeProvider } from 'pearl-ui'

const App = () => {
  return (
    // Wrap your app components with the ThemeProvider
    <ThemeProvider>
        // {... other components go here}
    </ThemeProvider>
  );
}
```

### ThemeProvider Props

The `ThemeProvider` component accepts the following props:

| Name             | Required | Type                                 | Default                               | Description                                     |
| ---------------- | -------- | ------------------------------------ | ------------------------------------- | ----------------------------------------------- |
| initialColorMode | No       | <t>"light" \| "dark" \| "system"</t> | `"light"`                             | Sets the initial color mode for the app.        |
| theme            | No       | <t>PearlTheme</t>                    | [baseTheme](../theming/default-theme) | Specifies the theme configuration object.       |
| haveFontsLoaded  | No       | <t>boolean</t>                       | `true`                                | Indicates whether the custom fonts have loaded. |

### Loading Fonts

Pearl UI allows you to load any font family into your app. This guide will demonstrate how to do this using the [Poppins](https://fonts.google.com/specimen/Poppins) font family, which is used in the default theme. To include this font family in your app, you need to install the [@expo/google-fonts](https://github.com/expo/google-fonts) package and load the fonts.

First, install the necessary packages by running the following command:

```bash
expo install @expo-google-fonts/poppins expo-font
```

Next, load the fonts in your main component as follows:

```jsx title="App.tsx"
// Import the useFonts hook and the default fonts used
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_300Light_Italic,
  Poppins_700Bold_Italic,
  Poppins_200ExtraLight,
  Poppins_100Thin_Italic,
  Poppins_100Thin,
  Poppins_400Regular_Italic,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold_Italic,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
  Poppins_200ExtraLight_Italic,
} from "@expo-google-fonts/poppins";

const App = () => {
  // Load the fonts using the hook and get the loading flag
  const [haveFontsLoaded] = useFonts({
    "Poppins-Hairline": Poppins_100Thin,
    "Poppins-HairlineItalic": Poppins_100Thin_Italic,
    "Poppins-Thin": Poppins_200ExtraLight,
    "Poppins-ThinItalic": Poppins_200ExtraLight_Italic,
    "Poppins-Light": Poppins_300Light,
    "Poppins-LightItalic": Poppins_300Light_Italic,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-RegularItalic": Poppins_400Regular_Italic,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-MediumItalic": Poppins_500Medium_Italic,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-SemiBoldItalic": Poppins_600SemiBold_Italic,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-BoldItalic": Poppins_700Bold_Italic,
    "Poppins-ExtraBold": Poppins_800ExtraBold,
    "Poppins-ExtraBoldItalic": Poppins_800ExtraBold_Italic,
    "Poppins-Black": Poppins_900Black,
    "Poppins-BlackItalic": Poppins_900Black_Italic,
  });

  return (
    // Pass the loading flag into the provider
    <ThemeProvider haveFontsLoaded={haveFontsLoaded}>
        // {... other components go here}
    </ThemeProvider>
  );
}
```

The `ThemeProvider` component optionally accepts a `haveFontsLoaded` prop. This prop ensures that your app only renders after all the fonts have loaded, preventing any flash of unstyled text (FOUT).

Congratulations! You have successfully set up Pearl UI in your application. You can now start using the components provided by the library.
