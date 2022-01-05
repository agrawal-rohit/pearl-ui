---
sidebar_position: 6
title: useColorModeValue
---

`useColorModeValue` is a custom hook used to get the appropriate value based on the current color mode.

## Import

```js
import { useColorModeValue } from "pearl-ui";
```

## Return value

The `useColorModeValue` hook returns the appropriate color as a <t>string</t>

## Usage

```js
const appropriateColor = useColorModeValue("red", "blue");
```

## Parameters

| Name         | Required | Type                         | Description                                             |
| ------------ | -------- | ---------------------------- | ------------------------------------------------------- |
| `lightColor` | true     | <t>PearlTheme['palette']</t> | The color value to return when the app is in light mode |
| `darkColor`  | true     | <t>PearlTheme['palette']</t> | The color value to return when the app is in dark mode  |
