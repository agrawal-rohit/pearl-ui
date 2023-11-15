---
sidebar_position: 6
title: useColorModeValue
---

The `useColorModeValue` hook is a powerful tool in Pearl UI that allows you to dynamically adjust color values based on the current color mode. This is particularly useful for creating responsive designs that adapt to user preferences for light or dark themes.

## Import

```js
import { useColorModeValue } from "pearl-ui";
```

## Return value

The `useColorModeValue` hook returns a color value as a string, which corresponds to the current color mode.

## Usage

Here's an example of how you can use `useColorModeValue` to dynamically adjust color values:

```js
const dynamicColor = useColorModeValue("red", "blue");
```

In this example, `dynamicColor` will be `"red"` in light mode and `"blue"` in dark mode.

## Parameters

| Name         | Required | Type                         | Description                                          |
| ------------ | -------- | ---------------------------- | ---------------------------------------------------- |
| `lightColor` | Yes      | <t>PearlTheme['palette']</t> | The color value to use when the app is in light mode |
| `darkColor`  | Yes      | <t>PearlTheme['palette']</t> | The color value to use when the app is in dark mode  |
