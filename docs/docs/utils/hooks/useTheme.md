---
sidebar_position: 1
title: useTheme
---

The `useTheme` hook is a powerful tool that allows you to access the currently active theme object, the active color mode, and provides a function to switch the active color mode. This hook is essential for dynamically adjusting the appearance of your application based on the user's preferred color scheme.

## Import

```js
import { useTheme } from "pearl-ui";
```

## Return Values

The `useTheme` hook returns an object containing the following properties:

| Name              | Type                                                 | Description                                                                    |
| ----------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| `theme`           | <t>PearlTheme</t>                                    | The theme configuration object for the currently active color mode.            |
| `colorMode`       | <t>"light" \|"dark"</t>                              | The currently active color mode.                                               |
| `toggleColorMode` | <t>() => void</t>                                    | A function that toggles the active color mode between light and dark.          |
| `switchColorMode` | <t>(mode: "light" \| "dark" \| "system") => void</t> | A function that allows you to switch the active color mode to a specific mode. |

## How to Use

Here's an example of how you can use the `useTheme` hook in your application:

```js
const { theme, colorMode, toggleColorMode, switchColorMode } = useTheme();
```
