---
sidebar_position: 7
title: useAccessibleColor
---

`useAccessibleColor` is a custom hook to get the most accessible foreground color value based on a provided background color. For instance, it is used under-the-hood in the [Avatar](../components/media/Avatar) component when displaying a name fallback.

## Import

```js
import { useAccessibleColor } from "pearl-ui";
```

## Return value

The `useAccessibleColor` returns the most accessible color as a <t>string</t>

## Usage

```js
const accessibleTextColor = useAccessibleColor("red", {
  light: "neutral.50",
  dark: "neutral.900",
});
```

## Parameters

| Name                | Type                                          | Description                                                                                                                                          |
| ------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `backgroundColor`   | <t>string</t>                                 | The color value of the background color.                                                                                                             |
| `foregroundChoices` | { light: <t>string</t>, dark: <t>string</t> } | The foreground color values to choose from. It expects an object which a 'light' key (for the lighter color) and a 'dark' key (for the darker color) |
