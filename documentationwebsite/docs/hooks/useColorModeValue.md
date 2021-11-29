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

The `useColorModeValue` returns the appropriate color as a <t>string</t>

## Usage

```js
const appropriateColor = useColorModeValue("red", "blue");
```

## Parameters

| Name         | Type          | Description                                             |
| ------------ | ------------- | ------------------------------------------------------- |
| `lightColor` | <t>string</t> | The color value to return when the app is in light mode |
| `darkColor`  | <t>string</t> | The color value to return when the app is in dark mode  |