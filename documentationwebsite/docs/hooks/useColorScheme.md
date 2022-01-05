---
sidebar_position: 7
title: useColorScheme
---

`useColorScheme` is a custom hook to covert an existing props object to a different color scheme from the active theme palette. By default, it is included inside the [useAtomicComponentConfig](./useAtomicComponentConfig) and [useMolecularComponentConfig](./useMolecularComponentConfig) hooks.

## Import

```js
import { useColorScheme } from "pearl-ui";
```

## Return value

The `useColorScheme` hook returns the same style props object passed into it, but with the `primary` color palette switched out for the desired color scheme (eg secondary, accent, etc)

## Usage

All components use the `primary` color scheme in their components by default. However, in some special cases, you might need to use a different set of colors in the component (eg. secondary/accent color buttons)

For simple atomic components, changing the color scheme is as easy overriding the desired properties of the component using [style props](../core-features/style-props). However, things get complicated when you want to do the same with complex molecular components. That's where the `useColorScheme` hook comes in.

As an example, let's take the following style props object returned by a [useMolecularComponentConfig](./useMolecularComponentConfig) hook:

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

To add support for switching the color scheme to use instead of `primary`, we can do so easily using the `useColorScheme` hook as follows:

```js
const secondaryComponentConfig = useColorScheme("secondary", componentConfig);
```

`secondaryComponentConfig` then has the following value:

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
| `targetColorScheme` | true     | <t>PearlTheme['palette'] </t> | Name of the target color scheme |
| `props`             | true     | <t>object</t>                 | Style props object              |
