---
sidebar_position: 8
title: useAccessibleColor
---

The `useAccessibleColor` hook is a powerful utility in Pearl UI that allows you to determine the most accessible foreground color based on a given background color. This hook is particularly useful in components like the [Avatar](../components/media/Avatar) where a name fallback is displayed against a variable background color.

## Import

```js
import { useAccessibleColor } from "pearl-ui";
```

## Return value

The `useAccessibleColor` hook returns a string representing the most accessible color based on the provided background color.

## Usage

Here's an example of how you can use `useAccessibleColor` to determine the most accessible text color for a given background color:

```js
const accessibleTextColor = useAccessibleColor("red", {
  light: "neutral.50",
  dark: "neutral.900",
});
```

## Parameters

| Name                | Required | Type                                                                        | Default                             | Description                                                                                                                                 |
| ------------------- | -------- | --------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `backgroundColor`   | Yes      | <t>PearlTheme['palette']</t>                                                |                                     | The color value of the background against which the text will be displayed.                                                                 |
| `foregroundChoices` | No       | { light: <t>PearlTheme['palette']</t>, dark: <t>PearlTheme['palette']</t> } | `{ light: "white", dark: "black" }` | An object containing potential foreground colors. It should have a 'light' key for the lighter color and a 'dark' key for the darker color. |
