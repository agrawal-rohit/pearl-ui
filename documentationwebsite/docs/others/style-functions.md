---
sidebar_position: 2
title: Style Functions
---

**Style Functions** are a set of pre-defined functions used by the [useStyledProps](../hooks/useStyledProps) to add support for style props to any React Native element. They also connect specific style properties to the values in the active theme object for a design-system-driven development experience.

The following list of style functions are supported in Pearl UI:

## Spacing

The **spacing** style function converts all the [spacing style props](../core-features/style-props#margin-and-padding) to React Native styles.

```js
import { spacingStyleFunction } from "pearl-ui";
```

## Typography

The **typography** style function converts all the [typography style props](../core-features/style-props#typography) to React Native styles.

```js
import { typographyStyleFunction } from "pearl-ui";
```

## Layout

The **layout** style function converts all the [layout style props](../core-features/style-props#layout) to React Native styles.

```js
import { layoutStyleFunction } from "pearl-ui";
```

## Position

The **position** style function converts all the [position style props](../core-features/style-props#position) to React Native styles.

```js
import { positionStyleFunction } from "pearl-ui";
```

## Border

The **border** style function converts all the [border style props](../core-features/style-props#border) to React Native styles.

```js
import { borderStyleFunction } from "pearl-ui";
```

## Shadow

The **shadow** style function converts all the [shadow style props](../core-features/style-props#shadow) to React Native styles.

```js
import { shadowStyleFunction } from "pearl-ui";
```

## Text Shadow

The **textShadow** style function converts all the [textShadow style props](../core-features/style-props#textShadow) to React Native styles.

```js
import { textShadowStyleFunction } from "pearl-ui";
```
