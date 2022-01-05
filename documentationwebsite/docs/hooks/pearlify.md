---
sidebar_position: 10
title: pearlify
---

`pearlify` is a custom hook to convert a third-party component to a Pearl atom component that can be configured using an [atomic component configuration](../theming/customize-theme#atomic-component-config).

## Import

```js
import { pearlify } from "pearl-ui";
```

## Return value

`pearlify` returns the passed-in component that expects Pearl supported [style props](../core-features/style-props).

## Usage

```tsx
import { View } from "react-native";

const newTheme = extendTheme({
  components: {
    TestView: {
      baseStyle: {
        width: 200,
        height: 200,
        backgroundColor: "danger.400",
        boxShadow: "4xl",
      },
    },
  },
});

const PearlifyViewComponent: React.FC = ({ children, ...props }) => {
  const PearlView = pearlify(View, "TestView");

  return <PearlView {...props}>{children}</PearlView>;
};
```

## Parameters

| Name            | Required | Type                   | Description                                                                                    |
| --------------- | -------- | ---------------------- | ---------------------------------------------------------------------------------------------- |
| `Component`     | true     | <t>React.Component</t> | Original component to be passed on where the atomic component configuration has to be applied. |
| `componentName` | true     | <t>string</t>          | Name of the custom component that would be stored in the active Pearl theme.                   |
