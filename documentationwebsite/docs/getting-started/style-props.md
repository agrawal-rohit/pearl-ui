---
sidebar_position: 4
title: Style Props
---

Style props provide a way to set the styling of a component by simply passing props to it. It helps developers save time while maintaining readability of complex components.

## Reference

The sections below list the supported style props and their expected values.

### Margin and padding

```jsx
// m="s" refers to the value of `theme.spacing["s"]`
<Box m="s">Tomato</Box>

// pt="xl" refers to the value of `theme.spacing["xl"]`
<Box pt="xl">Red</Box>
```

| Prop                      | Stylesheet property | Type                    |
| ------------------------- | ------------------- | ----------------------- |
| `m`, `margin`             | `margin`            | `PearlTheme['spacing']` |
| `mt`, `marginTop`         | `marginTop`         | `PearlTheme['spacing']` |
| `mr`, `marginRight`       | `marginRight`       | `PearlTheme['spacing']` |
| `mb`, `marginBottom`      | `marginBottom`      | `PearlTheme['spacing']` |
| `ml`, `marginLeft`        | `marginLeft`        | `PearlTheme['spacing']` |
| `mx`, `marginHorizontal`  | `marginHorizontal`  | `PearlTheme['spacing']` |
| `my`, `marginVertical`    | `marginVertical`    | `PearlTheme['spacing']` |
| `ms`, `marginStart`       | `marginStart`       | `PearlTheme['spacing']` |
| `me`, `marginEnd`         | `marginEnd`         | `PearlTheme['spacing']` |
| `p`, `padding`            | `padding`           | `PearlTheme['spacing']` |
| `pt`, `paddingTop`        | `paddingTop`        | `PearlTheme['spacing']` |
| `pr`, `paddingRight`      | `paddingRight`      | `PearlTheme['spacing']` |
| `pb`, `paddingBottom`     | `paddingBottom`     | `PearlTheme['spacing']` |
| `pl`, `paddingLeft`       | `paddingLeft`       | `PearlTheme['spacing']` |
| `px`, `paddingHorizontal` | `paddingHorizontal` | `PearlTheme['spacing']` |
| `py`, `paddingVertical`   | `paddingVertical`   | `PearlTheme['spacing']` |
| `ps`, `paddingStart`      | `paddingStart`      | `PearlTheme['spacing']` |
| `pe`, `paddingEnd`        | `paddingEnd`        | `PearlTheme['spacing']` |

### Color and Background Color

```jsx
// bg="primary-500" refers to the value of `theme.palette["primary-500"]`
<Box bg="primary-500">Primary Box</Box>

// You can pass values based on the desired color modes using the following structure
// type ColorModeColor = {
//      light: string,
//      dark: string
// }
// The specified 'light' and 'dark' values get activated based on the current color of the theme
<Box color={{ light: "neutral-200", dark: "primary-100" }}>Red</Box>
```

| Prop                    | Stylesheet property | Type                                        |
| ----------------------- | ------------------- | ------------------------------------------- |
| `bg`, `backgroundColor` | `backgroundColor`   | `PearlTheme['palette']` \| `ColorModeColor` |
| `color`                 | `color`             | `PearlTheme['palette']` \| `ColorModeColor` |

### Opacity and Visibility

```jsx
<Box opacity={0.3}>Translucent Box</Box>

<Box visible={false}>Hidden Box</Box>
```

| Prop      | Stylesheet property | Type      |
| --------- | ------------------- | --------- |
| `opacity` | `opacity`           | `number`  |
| `visible` | `visible`           | `boolean` |

### Layout

```jsx
<Box width="100%" height={200}>
  Translucent Box
</Box>

<Box width="100%" height={50} flex={1} flexDirection="row" justifyContent="space-between">
  <Box width={20} height={50}>
    1
  </Box>
  <Box width={50} height={50}>
    2
  </Box>
  <Box width={30} height={50}>
    3
  </Box>
</Box>
```

| Prop             | Stylesheet property | Type                                                                                          |
| ---------------- | ------------------- | --------------------------------------------------------------------------------------------- |
| `width`          | `width`             | `number` \| `string`                                                                          |
| `height`         | `height`            | `number` \| `string`                                                                          |
| `minWidth`       | `minWidth`          | `number` \| `string`                                                                          |
| `maxWidth`       | `maxWidth`          | `number` \| `string`                                                                          |
| `minHeight`      | `minHeight`         | `number` \| `string`                                                                          |
| `maxHeight`      | `maxHeight`         | `number` \| `string`                                                                          |
| `overflow`       | `overflow`          | 'visible' \| 'hidden' \| 'scroll'                                                             |
| `aspectRatio`    | `aspectRatio`       | `number`                                                                                      |
| `alignContent`   | `alignContent`      | 'flex-start' \| 'flex-end' \| 'center' \| 'stretch' \| 'space-between' \| 'space-around'      |
| `alignItems`     | `alignItems`        | 'flex-start' \| 'flex-end' \| 'center' \| 'stretch' \| 'baseline'                             |
| `alignSelf`      | `alignSelf`         | 'auto' \| 'flex-start' \| 'flex-end' \| 'center' \| 'stretch' \| 'baseline'                   |
| `justifyContent` | `justifyContent`    | 'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly' |
| `flex`           | `flex`              | `number`                                                                                      |
| `flexBasis`      | `flexBasis`         | `number` \| `string`                                                                          |
| `flexDirection`  | `flexDirection`     | 'row' \| 'column' \| 'row-reverse' \| 'column-reverse'                                        |
| `flexGrow`       | `flexGrow`          | `number`                                                                                      |
| `flexShrink`     | `flexShrink`        | `number`                                                                                      |
| `flexWrap`       | `flexWrap`          | 'wrap' \| 'nowrap' \| 'wrap-reverse'                                                          |

### Position

```jsx
<Box
  top={20}
  alignItems="center"
  justifyContent="center"
  width="100%"
  position="absolute"
>
  Absolute box
</Box>
```

| Prop       | Stylesheet property | Type                                 |
| ---------- | ------------------- | ------------------------------------ |
| `position` | `position`          | 'absolute' \| 'relative'             |
| `top`      | `top`               | `number` \| `string`                 |
| `right`    | `right`             | `number` \| `string`                 |
| `bottom`   | `bottom`            | `number` \| `string`                 |
| `left`     | `left`              | `number` \| `string`                 |
| `start`    | `start`             | `number` \| `string`                 |
| `end`      | `end`               | `number` \| `string`                 |
| `zIndex`   | `zIndex`            | `PearlTheme['zIndices']` \| `number` |

### Border

```jsx
// borderColor="tomato" refers to the value of `theme.palette["tomato"]`
// borderRadius="l" refers to the value of `theme.borderRadii["l"]`
<Box
  backgroundColor="neutral-100"
  width="40%"
  height={200}
  borderStyle="solid"
  borderWidth={2}
  borderColor="tomato"
  borderRadius="l"
>
  Absolute box
</Box>
```

| Prop                      | Stylesheet property       | Type                                        |
| ------------------------- | ------------------------- | ------------------------------------------- |
| `borderBottomWidth`       | `borderBottomWidth`       | `number`                                    |
| `borderLeftWidth`         | `borderLeftWidth`         | `number`                                    |
| `borderRightWidth`        | `borderRightWidth`        | `number`                                    |
| `borderStyle`             | `borderStyle`             | 'solid' \| 'dotted' \| 'dashed'             |
| `borderTopWidth`          | `borderTopWidth`          | `number`                                    |
| `borderStartWidth`        | `borderStartWidth`        | `number`                                    |
| `borderEndWidth`          | `borderEndWidth`          | `number`                                    |
| `borderWidth`             | `borderWidth`             | `number`                                    |
| `borderColor`             | `borderColor`             | `PearlTheme['palette']` \| `ColorModeColor` |
| `borderTopColor`          | `borderTopColor`          | `PearlTheme['palette']` \| `ColorModeColor` |
| `borderRightColor`        | `borderRightColor`        | `PearlTheme['palette']` \| `ColorModeColor` |
| `borderLeftColor`         | `borderLeftColor`         | `PearlTheme['palette']` \| `ColorModeColor` |
| `borderBottomColor`       | `borderBottomColor`       | `PearlTheme['palette']` \| `ColorModeColor` |
| `borderStartColor`        | `borderStartColor`        | `PearlTheme['palette']` \| `ColorModeColor` |
| `borderEndColor`          | `borderEndColor`          | `PearlTheme['palette']` \| `ColorModeColor` |
| `borderRadius`            | `borderRadius`            | `PearlTheme['borderRadii']` \| `number`     |
| `borderBottomLeftRadius`  | `borderBottomLeftRadius`  | `PearlTheme['borderRadii']` \| `number`     |
| `borderBottomRightRadius` | `borderBottomRightRadius` | `PearlTheme['borderRadii']` \| `number`     |
| `borderTopLeftRadius`     | `borderTopLeftRadius`     | `PearlTheme['borderRadii']` \| `number`     |
| `borderTopRightRadius`    | `borderTopRightRadius`    | `PearlTheme['borderRadii']` \| `number`     |
| `borderBottomStartRadius` | `borderBottomStartRadius` | `PearlTheme['borderRadii']` \| `number`     |
| `borderBottomEndRadius`   | `borderBottomEndRadius`   | `PearlTheme['borderRadii']` \| `number`     |
| `borderTopStartRadius`    | `borderTopStartRadius`    | `PearlTheme['borderRadii']` \| `number`     |
| `borderTopEndRadius`      | `borderTopEndRadius`      | `PearlTheme['borderRadii']` \| `number`     |

### Typography

```jsx
// textShadowColor="blue" refers to the value of `theme.palette["blue"]`
<Text
  lineHeight={12}
  textAlign="center"
  textDecorationLine="underline"
  textShadowColor="blue"
>
  This is a demo text
</Text>
```

| Prop                  | Stylesheet property   | Type                                                                                                |
| --------------------- | --------------------- | --------------------------------------------------------------------------------------------------- |
| `fontFamily`          | `fontFamily`          | `string`                                                                                            |
| `fontSize`            | `fontSize`            | `number`                                                                                            |
| `fontStyle`           | `fontStyle`           | 'normal' \| 'italic'                                                                                |
| `fontWeight`          | `fontWeight`          | 'normal' \| 'bold' \| '100' \| '200' \| '300' \| '400' \| '500' \| '600' \| '700' \| '800' \| '900' |
| `letterSpacing`       | `letterSpacing`       | 'solid' \| 'dotted' \| 'dashed'                                                                     |
| `lineHeight`          | `lineHeight`          | `number`                                                                                            |
| `textAlign`           | `textAlign`           | 'auto' \| 'left' \| 'right' \| 'center' \| 'justify'                                                |
| `textDecorationLine`  | `textDecorationLine`  | 'none' \| 'underline' \| 'line-through' \| 'underline line-through'                                 |
| `textDecorationStyle` | `textDecorationStyle` | 'solid' \| 'double' \| 'dotted' \| 'dashed'                                                         |
| `textTransform`       | `textTransform`       | 'none' \| 'capitalize' \| 'uppercase' \| 'lowercase'                                                |
| `textShadowOffset`    | `textShadowOffset`    | { width: `number`, height: `number` }                                                               |
| `textShadowRadius`    | `textShadowRadius`    | `number`                                                                                            |
| `textShadowColor`     | `textShadowColor`     | `PearlTheme['palette']` \| `ColorModeColor`                                                         |

### Shadow

```jsx
// boxShadow="l" refers to the value of `theme.elevation["l"]`
<Box boxShadow="l">Theme Shadow box</Box>

// shadowColor="neutral-800" refers to the value of `theme.palette["neutral-800"]`
<Box
  shadowOffset={{width: 20, height: 10}}
  shadowColor="neutral-800"
  shadowRadius={13}
  shadowOpacity={0.7}
>
  Custom Shadow box
</Box>
```

| Prop            | Stylesheet property                                                             | Type                                        |
| --------------- | ------------------------------------------------------------------------------- | ------------------------------------------- |
| `boxShadow`     | `shadowOffset` + `shadowOpacity` + `shadowRadius` + `elevation` + `shadowColor` | `PearlTheme['elevation']`                   |
| `shadowColor`   | `shadowColor`                                                                   | `PearlTheme['palette']` \| `ColorModeColor` |
| `shadowOffset`  | `shadowOffset`                                                                  | { width: `number`, height: `number` }       |
| `shadowOpacity` | `shadowOpacity`                                                                 | `number`                                    |
| `shadowRadius`  | `shadowRadius`                                                                  | `number`                                    |
