---
sidebar_position: 3
title: Usage
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

| Name             | Type              | Default     | Description                                                  |
| ---------------- | ----------------- | ----------- | ------------------------------------------------------------ |
| defaultColorMode | <t>string</t>     | `"light"`   | Default color mode for the app (light, dark, system)         |
| theme            | <t>PearlTheme</t> | `baseTheme` | The theme configuration object                               |
| haveFontsLoaded  | <t>boolean</t>    | `true`      | A flag that describes the loading status of the custom fonts |

## Loading default fonts

Pearl UI uses [Poppins](https://fonts.google.com/specimen/Poppins) as the font family in the default theme _(For more information, check out the [Theme](../theming/default-theme) section)_.

To include the font family into the app, we use the [@expo/google-fonts](https://github.com/expo/google-fonts) package:

```bash
expo install @expo-google-fonts/poppins expo-font
```

Loading the font family into the theme can then be done as follows:

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
} from "@expo-google-fonts/poppins";

const App = () => {
  // Load the fonts using the hook and get the loading flag
  const [haveFontsLoaded] = useFonts({
    "Poppins-Light": Poppins_300Light,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-ExtraBold": Poppins_800ExtraBold,
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

That's it, You're good to go!
