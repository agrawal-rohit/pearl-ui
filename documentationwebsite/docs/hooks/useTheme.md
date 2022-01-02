---
sidebar_position: 1
title: useTheme
---

`useTheme` is a custom hook used to get the active theme object, active color mode, and a function to toggle the active color mode.

## Import

```js
import { useTheme } from "pearl-ui";
```

## Return value

| Name              | Type                                 | Description                                                  |
| ----------------- | ------------------------------------ | ------------------------------------------------------------ |
| `theme`           | <t>PearlTheme</t>                    | Theme configuration object for the active color mode.        |
| `colorMode`       | <t>"light" \|"dark"</t>              | Active color mode.                                           |
| `toggleColorMode` | <t>() => void</t>                    | Function to toggle the active color mode.                    |
| `switchColorMode` | <t>"light" \| "dark" \| "system"</t> | Function to switch the active color mode to a specific mode. |

## Usage

```js
const { theme, colorMode, toggleColorMode, switchColorMode } = useTheme();
```
