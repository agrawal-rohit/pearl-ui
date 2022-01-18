---
sidebar_position: 2
title: Style Functions
---

**Style Functions** are a set of pre-defined functions used by the [useStyleProps](../hooks/useStyleProps) to add support for style props to any React Native element. They also connect specific style properties to the values in the active theme object for a design-system-driven development experience.

The following list of style functions are supported in Pearl UI:

## Style Function Collections

A collection of the most used style functions offered in Pearl UI.

### Box Style Functions

The set of style functions used to construct the [Box](../components/layout/Box) component. It consists of the following style functions:

- [Background Color](#background-color)
- [Opacity](#opacity)
- [Visibility](#visibility)
- [Layout](#layout)
- [Spacing](#spacing)
- [Border](#border)
- [Shadow](#shadow)
- [Position](#position)

```js
import { boxStyleFunctions } from "pearl-ui";
```

### Text Style Functions

The set of style functions used to construct the [Text](../components/typography/Text) component. It consists of the following style functions:

- [Color](#color)
- [Background Color](#background-color)
- [Opacity](#opacity)
- [Visibility](#visibility)
- [Layout](#layout)
- [Typography](#typography)
- [Spacing](#spacing)
- [Position](#position)
- [Text Shadow](#text-shadow)

```js
import { textStyleFunctions } from "pearl-ui";
```

### All Functions

The set of all style functions offered in Pearl UI.

```js
import { allStyleFunctions } from "pearl-ui";
```

## Individual Style Functions

### Background Color

The **backgroundColorStyleFunction** style function converts all the [backgroundColor style props](../core-features/style-props#color-and-background-color) to React Native styles.

```js
import { backgroundColorStyleFunction } from "pearl-ui";
```

### Color

The **colorStyleFunction** style function converts all the [color style props](../core-features/style-props#color-and-background-color) to React Native styles.

```js
import { colorStyleFunction } from "pearl-ui";
```

### Opacity

The **opacityStyleFunction** style function converts all the [opacity style props](../core-features/style-props#opacity-and-visibility) to React Native styles.

```js
import { opacityStyleFunction } from "pearl-ui";
```

### Visibility

The **visibleStyleFunction** style function converts all the [visible style props](../core-features/style-props#opacity-and-visibility) to React Native styles.

```js
import { visibleStyleFunction } from "pearl-ui";
```

### Spacing

The **spacingStyleFunction** style function converts all the [spacing style props](../core-features/style-props#margin-and-padding) to React Native styles.

```js
import { spacingStyleFunction } from "pearl-ui";
```

### Typography

The **typographyStyleFunction** style function converts all the [typography style props](../core-features/style-props#typography) to React Native styles.

```js
import { typographyStyleFunction } from "pearl-ui";
```

### Layout

The **layoutStyleFunction** style function converts all the [layout style props](../core-features/style-props#layout) to React Native styles.

```js
import { layoutStyleFunction } from "pearl-ui";
```

### Position

The **positionStyleFunction** style function converts all the [position style props](../core-features/style-props#position) to React Native styles.

```js
import { positionStyleFunction } from "pearl-ui";
```

### Border

The **borderStyleFunction** style function converts all the [border style props](../core-features/style-props#border) to React Native styles.

```js
import { borderStyleFunction } from "pearl-ui";
```

### Shadow

The **shadowStyleFunction** style function converts all the [shadow style props](../core-features/style-props#shadow) to React Native styles.

```js
import { shadowStyleFunction } from "pearl-ui";
```

### Text Shadow

The **textShadowStyleFunction** style function converts all the [textShadow style props](../core-features/style-props#textShadow) to React Native styles.

```js
import { textShadowStyleFunction } from "pearl-ui";
```
