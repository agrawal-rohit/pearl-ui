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

| Prop                      | Stylesheet property | Type                         |
| ------------------------- | ------------------- | ---------------------------- |
| `m`, `margin`             | `margin`            | <t>PearlTheme['spacing']</t> |
| `mt`, `marginTop`         | `marginTop`         | <t>PearlTheme['spacing']</t> |
| `mr`, `marginRight`       | `marginRight`       | <t>PearlTheme['spacing']</t> |
| `mb`, `marginBottom`      | `marginBottom`      | <t>PearlTheme['spacing']</t> |
| `ml`, `marginLeft`        | `marginLeft`        | <t>PearlTheme['spacing']</t> |
| `mx`, `marginHorizontal`  | `marginHorizontal`  | <t>PearlTheme['spacing']</t> |
| `my`, `marginVertical`    | `marginVertical`    | <t>PearlTheme['spacing']</t> |
| `ms`, `marginStart`       | `marginStart`       | <t>PearlTheme['spacing']</t> |
| `me`, `marginEnd`         | `marginEnd`         | <t>PearlTheme['spacing']</t> |
| `p`, `padding`            | `padding`           | <t>PearlTheme['spacing']</t> |
| `pt`, `paddingTop`        | `paddingTop`        | <t>PearlTheme['spacing']</t> |
| `pr`, `paddingRight`      | `paddingRight`      | <t>PearlTheme['spacing']</t> |
| `pb`, `paddingBottom`     | `paddingBottom`     | <t>PearlTheme['spacing']</t> |
| `pl`, `paddingLeft`       | `paddingLeft`       | <t>PearlTheme['spacing']</t> |
| `px`, `paddingHorizontal` | `paddingHorizontal` | <t>PearlTheme['spacing']</t> |
| `py`, `paddingVertical`   | `paddingVertical`   | <t>PearlTheme['spacing']</t> |
| `ps`, `paddingStart`      | `paddingStart`      | <t>PearlTheme['spacing']</t> |
| `pe`, `paddingEnd`        | `paddingEnd`        | <t>PearlTheme['spacing']</t> |

### Color and Background Color

```jsx
// bg="primary.500" refers to the value of `theme.palette["primary"]["500"]`
<Box bg="primary.500">Primary Box</Box>

// You can pass values based on the desired color modes using the following structure
// type ColorModeColor = {
//      light: string,
//      dark: string
// }
// The specified 'light' and 'dark' values get activated based on the current color of the theme
<Box color={{ light: "neutral.200", dark: "primary.100" }}>Red</Box>
```

| Prop                    | Stylesheet property | Type                                           |
| ----------------------- | ------------------- | ---------------------------------------------- |
| `bg`, `backgroundColor` | `backgroundColor`   | <t>PearlTheme['palette'] \| ColorModeColor</t> |
| `color`                 | `color`             | <t>PearlTheme['palette'] \| ColorModeColor</t> |

### Opacity and Visibility

```jsx
<Box opacity={0.3}>Translucent Box</Box>

<Box visible={false}>Hidden Box</Box>
```

| Prop      | Stylesheet property | Type           |
| --------- | ------------------- | -------------- |
| `opacity` | `opacity`           | <t>number</t>  |
| `visible` | `visible`           | <t>boolean</t> |

### Layout

```jsx
<Box width="100%" height={200}>
  Translucent Box
</Box>

<Box width="100%" height={50} flex={1} flexDirection="row" justifyContent="space-between">
  <Box width={20} height={50}>
    1
  </Box>
  <Box w={50} h={30} maxHeight={50}>
    2
  </Box>
  <Box w={30} maxW={40} height={50}>
    3
  </Box>
</Box>
```

| Prop                | Stylesheet property | Type                                                                                                 |
| ------------------- | ------------------- | ---------------------------------------------------------------------------------------------------- |
| `w`, `width`        | `width`             | <t>number \| string</t>                                                                              |
| `h`, `height`       | `height`            | <t>number \| string</t>                                                                              |
| `minW`, `minWidth`  | `minWidth`          | <t>number \| string</t>                                                                              |
| `maxW`, `maxWidth`  | `maxWidth`          | <t>number \| string</t>                                                                              |
| `minH`, `minHeight` | `minHeight`         | <t>number \| string</t>                                                                              |
| `maxH`, `maxHeight` | `maxHeight`         | <t>number \| string</t>                                                                              |
| `overflow`          | `overflow`          | <t>'visible' \| 'hidden' \| 'scroll' </t>                                                            |
| `aspectRatio`       | `aspectRatio`       | <t>number</t>                                                                                        |
| `alignContent`      | `alignContent`      | <t>'flex-start' \| 'flex-end' \| 'center' \| 'stretch' \| 'space-between' \| 'space-around'</t>      |
| `alignItems`        | `alignItems`        | <t>'flex-start' \| 'flex-end' \| 'center' \| 'stretch' \| 'baseline' </t>                            |
| `alignSelf`         | `alignSelf`         | <t>'auto' \| 'flex-start' \| 'flex-end' \| 'center' \| 'stretch' \| 'baseline' </t>                  |
| `justifyContent`    | `justifyContent`    | <t>'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'</t> |
| `flex`              | `flex`              | <t>number </t>                                                                                       |
| `flexBasis`         | `flexBasis`         | <t>number \| string</t>                                                                              |
| `flexDirection`     | `flexDirection`     | <t>'row' \| 'column' \| 'row-reverse' \| 'column-reverse' </t>                                       |
| `flexGrow`          | `flexGrow`          | <t>number</t>                                                                                        |
| `flexShrink`        | `flexShrink`        | <t>number</t>                                                                                        |
| `flexWrap`          | `flexWrap`          | <t>'wrap' \| 'nowrap' \| 'wrap-reverse' </t>                                                         |

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

| Prop       | Stylesheet property | Type                                    |
| ---------- | ------------------- | --------------------------------------- |
| `position` | `position`          | <t>'absolute' \| 'relative' </t>        |
| `top`      | `top`               | <t>number \| string</t>                 |
| `right`    | `right`             | <t>number \| string</t>                 |
| `bottom`   | `bottom`            | <t>number \| string</t>                 |
| `left`     | `left`              | <t>number \| string</t>                 |
| `start`    | `start`             | <t>number \| string</t>                 |
| `end`      | `end`               | <t>number \| string</t>                 |
| `zIndex`   | `zIndex`            | <t>PearlTheme['zIndices'] \| number</t> |

### Border

```jsx
// borderColor="tomato" refers to the value of `theme.palette["tomato"]`
// borderRadius="l" refers to the value of `theme.borderRadii["l"]`
<Box
  backgroundColor="neutral.100"
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

| Prop                      | Stylesheet property       | Type                                           |
| ------------------------- | ------------------------- | ---------------------------------------------- |
| `borderBottomWidth`       | `borderBottomWidth`       | <t>number</t>                                  |
| `borderLeftWidth`         | `borderLeftWidth`         | <t>number</t>                                  |
| `borderRightWidth`        | `borderRightWidth`        | <t>number</t>                                  |
| `borderStyle`             | `borderStyle`             | <t>'solid' \| 'dotted' \| 'dashed'</t>         |
| `borderTopWidth`          | `borderTopWidth`          | <t>number</t>                                  |
| `borderStartWidth`        | `borderStartWidth`        | <t>number</t>                                  |
| `borderEndWidth`          | `borderEndWidth`          | <t>number</t>                                  |
| `borderWidth`             | `borderWidth`             | <t>number</t>                                  |
| `borderColor`             | `borderColor`             | <t>PearlTheme['palette'] \| ColorModeColor</t> |
| `borderTopColor`          | `borderTopColor`          | <t>PearlTheme['palette'] \| ColorModeColor</t> |
| `borderRightColor`        | `borderRightColor`        | <t>PearlTheme['palette'] \| ColorModeColor</t> |
| `borderLeftColor`         | `borderLeftColor`         | <t>PearlTheme['palette'] \| ColorModeColor</t> |
| `borderBottomColor`       | `borderBottomColor`       | <t>PearlTheme['palette'] \| ColorModeColor</t> |
| `borderStartColor`        | `borderStartColor`        | <t>PearlTheme['palette'] \| ColorModeColor</t> |
| `borderEndColor`          | `borderEndColor`          | <t>PearlTheme['palette'] \| ColorModeColor</t> |
| `borderRadius`            | `borderRadius`            | <t>PearlTheme['borderRadii'] \| number</t>     |
| `borderBottomLeftRadius`  | `borderBottomLeftRadius`  | <t>PearlTheme['borderRadii'] \| number</t>     |
| `borderBottomRightRadius` | `borderBottomRightRadius` | <t>PearlTheme['borderRadii'] \| number</t>     |
| `borderTopLeftRadius`     | `borderTopLeftRadius`     | <t>PearlTheme['borderRadii'] \| number</t>     |
| `borderTopRightRadius`    | `borderTopRightRadius`    | <t>PearlTheme['borderRadii'] \| number</t>     |
| `borderBottomStartRadius` | `borderBottomStartRadius` | <t>PearlTheme['borderRadii'] \| number</t>     |
| `borderBottomEndRadius`   | `borderBottomEndRadius`   | <t>PearlTheme['borderRadii'] \| number</t>     |
| `borderTopStartRadius`    | `borderTopStartRadius`    | <t>PearlTheme['borderRadii'] \| number</t>     |
| `borderTopEndRadius`      | `borderTopEndRadius`      | <t>PearlTheme['borderRadii'] \| number</t>     |

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

| Prop                  | Stylesheet property   | Type                                                                                                       |
| --------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------- |
| `fontFamily`          | `fontFamily`          | <t>string</t>                                                                                              |
| `fontSize`            | `fontSize`            | <t>number</t>                                                                                              |
| `fontStyle`           | `fontStyle`           | <t>'normal' \| 'italic'</t>                                                                                |
| `fontWeight`          | `fontWeight`          | <t>'normal' \| 'bold' \| '100' \| '200' \| '300' \| '400' \| '500' \| '600' \| '700' \| '800' \| '900'</t> |
| `letterSpacing`       | `letterSpacing`       | <t>'solid' \| 'dotted' \| 'dashed' </t>                                                                    |
| `lineHeight`          | `lineHeight`          | <t>number</t>                                                                                              |
| `textAlign`           | `textAlign`           | <t>'auto' \| 'left' \| 'right' \| 'center' \| 'justify' </t>                                               |
| `textDecorationLine`  | `textDecorationLine`  | <t>'none' \| 'underline' \| 'line-through' \| 'underline line-through' </t>                                |
| `textDecorationStyle` | `textDecorationStyle` | <t>'solid' \| 'double' \| 'dotted' \| 'dashed' </t>                                                        |
| `textTransform`       | `textTransform`       | <t>'none' \| 'capitalize' \| 'uppercase' \| 'lowercase' </t>                                               |
| `textShadowOffset`    | `textShadowOffset`    | <t>{ width: number; height: number }</t>                                                                   |
| `textShadowRadius`    | `textShadowRadius`    | <t>number</t>                                                                                              |
| `textShadowColor`     | `textShadowColor`     | <t>PearlTheme['palette'] \| ColorModeColor</t>                                                             |

### Shadow

```jsx
// boxShadow="l" refers to the value of `theme.elevation["l"]`
<Box boxShadow="l">Theme Shadow box</Box>

// shadowColor="neutral.800" refers to the value of `theme.palette["neutral"]["800"]`
<Box
  shadowOffset={{width: 20, height: 10}}
  shadowColor="neutral.800"
  shadowRadius={13}
  shadowOpacity={0.7}
>
  Custom Shadow box
</Box>
```

| Prop            | Stylesheet property                                                             | Type                                           |
| --------------- | ------------------------------------------------------------------------------- | ---------------------------------------------- |
| `boxShadow`     | `shadowOffset` + `shadowOpacity` + `shadowRadius` + `elevation` + `shadowColor` | <t>PearlTheme['elevation']</t>                 |
| `shadowColor`   | `shadowColor`                                                                   | <t>PearlTheme['palette'] \| ColorModeColor</t> |
| `shadowOffset`  | `shadowOffset`                                                                  | <t>{ width: number; height: number }</t>       |
| `shadowOpacity` | `shadowOpacity`                                                                 | <t>number</t>                                  |
| `shadowRadius`  | `shadowRadius`                                                                  | <t>number</t>                                  |
