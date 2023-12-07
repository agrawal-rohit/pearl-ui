---
sidebar_position: 2
title: Style Functions
---

**Style Functions** in Pearl UI are a collection of predefined functions that are utilized by the [useStyleProps](../hooks/useStyleProps) hook. These functions enable the addition of style props to any React Native element and link specific style properties to the values in the active theme object, facilitating a design-system-driven development experience.

Here is a list of the style functions supported in Pearl UI:

## Collections of Style Functions

Pearl UI offers a collection of commonly used style functions.

### Box Style Functions

These are the style functions used to construct the [Box](../components/layout/Box) component. The collection includes the following style functions:

- [Background Color](#background-color)
- [Opacity](#opacity)
- [Visibility](#visibility)
- [Layout](#layout)
- [Transform](#transform)
- [Spacing](#spacing)
- [Border](#border)
- [Shadow](#shadow)
- [Position](#position)

```js
import { boxStyleFunctions } from "pearl-ui";
```

### Text Style Functions

These are the style functions used to construct the [Text](../components/typography/Text) component. The collection includes the following style functions:

- [Color](#color)
- [Background Color](#background-color)
- [Opacity](#opacity)
- [Visibility](#visibility)
- [Layout](#layout)
- [Transform](#transform)
- [Typography](#typography)
- [Spacing](#spacing)
- [Position](#position)
- [Text Shadow](#text-shadow)

```js
import { textStyleFunctions } from "pearl-ui";
```

### All Functions

This is a collection of all the style functions offered in Pearl UI.

```js
import { allStyleFunctions } from "pearl-ui";
```

## Individual Style Functions

Each style function in Pearl UI is designed to convert specific style props to React Native styles. Here are the individual style functions:

### Background Color

The **backgroundColorStyleFunction** converts all the [backgroundColor style props](../core-features/style-props#color-and-background-color) to React Native styles.

```js
import { backgroundColorStyleFunction } from "pearl-ui";
```

### Color

The **colorStyleFunction** converts all the [color style props](../core-features/style-props#color-and-background-color) to React Native styles.

```js
import { colorStyleFunction } from "pearl-ui";
```

### Opacity

The **opacityStyleFunction** converts all the [opacity style props](../core-features/style-props#opacity-and-visibility) to React Native styles.

```js
import { opacityStyleFunction } from "pearl-ui";
```

### Visibility

The **visibleStyleFunction** converts all the [visible style props](../core-features/style-props#opacity-and-visibility) to React Native styles.

```js
import { visibleStyleFunction } from "pearl-ui";
```

### Spacing

The **spacingStyleFunction** converts all the [spacing style props](../core-features/style-props#margin-and-padding) to React Native styles.

```js
import { spacingStyleFunction } from "pearl-ui";
```

### Typography

The **typographyStyleFunction** converts all the [typography style props](../core-features/style-props#typography) to React Native styles.

```js
import { typographyStyleFunction } from "pearl-ui";
```

### Layout

The **layoutStyleFunction** converts all the [layout style props](../core-features/style-props#layout) to React Native styles.

```js
import { layoutStyleFunction } from "pearl-ui";
```

### Transform

The **transformStyleFunction** converts all the [transform style props](../core-features/style-props#transform) to React Native styles.

```js
import { transformStyleFunction } from "pearl-ui";
```

### Position

The **positionStyleFunction** converts all the [position style props](../core-features/style-props#position) to React Native styles.

```js
import { positionStyleFunction } from "pearl-ui";
```

### Border

The **borderStyleFunction** converts all the [border style props](../core-features/style-props#border) to React Native styles.

```js
import { borderStyleFunction } from "pearl-ui";
```

### Shadow

The **shadowStyleFunction** converts all the [shadow style props](../core-features/style-props#shadow) to React Native styles.

```js
import { shadowStyleFunction } from "pearl-ui";
```

### Text Shadow

The **textShadowStyleFunction** converts all the [textShadow style props](../core-features/style-props#textShadow) to React Native styles.

```js
import { textShadowStyleFunction } from "pearl-ui";
```
