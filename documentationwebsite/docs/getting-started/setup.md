---
sidebar_position: 2
title: Setup
---

## Setting up the theme provider

For Pearl UI to work correctly, you need to wrap your application with the `ThemeProvider` provided by the library.

Go to the root of your app and do the following:

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

| Name             | Required | Type                                 | Default                               | Description                                                   |
| ---------------- | -------- | ------------------------------------ | ------------------------------------- | ------------------------------------------------------------- |
| initialColorMode | false    | <t>"light" \| "dark" \| "system"</t> | `"light"`                             | Initial color mode for the app.                               |
| theme            | false    | <t>PearlTheme</t>                    | [baseTheme](../theming/default-theme) | The theme configuration object.                               |
| haveFontsLoaded  | false    | <t>boolean</t>                       | `true`                                | A flag that describes the loading status of the custom fonts. |

## Loading default fonts

Pearl UI uses [Poppins](https://fonts.google.com/specimen/Poppins) as the font family in the default theme _(For more information, check out the [Default Theme](../theming/default-theme) section)_.

To include the font family into the app, we use the [@expo/google-fonts](https://github.com/expo/google-fonts) package:

```bash
expo install @expo-google-fonts/poppins expo-font
```

The font family can then be loaded in the following manner:

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

<br />

The `ThemeProvider` optionally expects a `haveFontsLoaded` prop which ensures that your app loads only after all the underlying fonts have loaded.

That's it, You're good to go!
