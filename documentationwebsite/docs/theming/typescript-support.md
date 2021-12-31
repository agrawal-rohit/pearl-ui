---
sidebar_position: 5
title: Typescript Support
---

Keeping track of values in your custom design configuration can be tedious, but fret not! Pearl UI harnesses the power of **Typescript** to provide you real-time auto-completion in your IDE.

## Adding Typescript support

```tsx {20-24}
import { extendTheme, ThemeProvider, Box } from "pearl-ui";

const theme = extendTheme({
  palette: {
    accent: {
      100: "#b6fee2",
      200: "#89fdd0",
      300: "#5bfcbe",
      400: "#2efbac",
      500: "#00fa9a",
      600: "#00cd7f",
      700: "#00a163",
      800: "#007448",
      900: "#00472c",
    },
  },
});

// Add this code block to enable typescript support for your theme
type AppTheme = typeof theme;

declare module "pearl-ui" {
  interface CustomPearlTheme extends AppTheme {}
}

function App() {
  return (
    // 3. Pass the new theme to `ThemeProvider`
    <ThemeProvider theme={theme}>
      {/* 4. Now you can use these colors in your components */}
      <Box w={200} h={200} backgroundColor="accent.200" borderRadius="2xl" />
    </ThemeProvider>
  );
}
```

## Example

![](/img/typescript_example.png)
