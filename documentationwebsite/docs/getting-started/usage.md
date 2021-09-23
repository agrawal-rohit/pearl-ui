---
sidebar_position: 2
title: Usage
---

## Setting up the theme provider

For Pearl UI to work correctly, you need to wrap your application with the `ThemeProvider` provided by the library.

Go to the root of your app and do the following:

```jsx title="App.tsx"
import * as React from 'react';

// Import the ThemeProvider component
import {ThemeProvider} from 'pearl-ui'

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

| Name | Type | Default | Description |
|-----|-----|-----|-----|
| defaultColorMode | `string` | `"light"` | Default color mode for the app (light, dark, system) |
| theme | `PearlTheme` | `baseTheme` | The theme configuration object |
| fonts | `object` | `baseFont` | A mapping object of the fonts used by the theme | 

<br />

That's it, You're good to go!
