---
sidebar_position: 7
title: useColorScheme
---

The `useColorScheme` hook is a powerful tool in Pearl UI that allows you to transform an existing props object to a different color scheme from the active theme palette. This hook is particularly useful for creating responsive designs that adapt to user preferences for different color schemes.

## Import

```js
import { useColorScheme } from "pearl-ui";
```

## Return value

The `useColorScheme` hook returns the same style props object passed into it, but with the `primary` color palette replaced with the desired color scheme (e.g., secondary, accent, etc.)

## Usage

By default, all components use the `primary` color scheme. However, you may need to use a different set of colors in certain cases (e.g., secondary/accent color buttons). For simple atomic components, changing the color scheme is as easy as overriding the desired properties of the component using [style props](../core-features/style-props). For complex molecular components, the `useColorScheme` hook simplifies this process.

For instance, consider the following style props object returned by a [useMolecularComponentConfig](./useMolecularComponentConfig) hook:

```js {3,9,21,25}
const componentConfig = {
  icon: {
    color: "primary.200",
    size: "m",
  },
  root: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "primary.500",
    borderRadius: "m",
    borderWidth: 2,
    justifyContent: "center",
    margin: "2xs",
    px: "s",
    py: "s",
    style: {
      display: "flex",
    },
  },
  spinner: {
    color: "primary.300",
    size: "m",
  },
  text: {
    color: "primary.500",
    variant: "btn2",
  },
};
```

To switch the color scheme from `primary` to `secondary`, you can use the `useColorScheme` hook as follows:

```js
const secondaryComponentConfig = useColorScheme("secondary", componentConfig);
```

The `secondaryComponentConfig` then has the following value:

```js {3,9,21,25}
{
  icon: {
    color: "secondary.200",
    size: "m",
  },
  root: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderColor: "secondary.500",
    borderRadius: "m",
    borderWidth: 2,
    justifyContent: "center",
    margin: "2xs",
    px: "s",
    py: "s",
    style: {
      display: "flex",
    },
  },
  spinner: {
    color: "secondary.300",
    size: "m",
  },
  text: {
    color: "secondary.500",
    variant: "btn2",
  },
};
```

## Parameters

| Name                | Required | Type                          | Description                     |
| ------------------- | -------- | ----------------------------- | ------------------------------- |
| `targetColorScheme` | Yes      | <t>PearlTheme['palette'] </t> | Name of the target color scheme |
| `props`             | Yes      | <t>object</t>                 | Style props object              |
