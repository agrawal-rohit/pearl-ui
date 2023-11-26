---
sidebar_position: 8
title: useAnimationState
---

The `useAnimationState` hook is a custom hook in Pearl UI that creates an animation state using the provided props and style functions. This hook is particularly useful in components where animation variants need to be used.

## Import

```js
import { useAnimationState } from "pearl-ui";
```

## Return value

The `useAnimationState` hook returns an animation state created using the provided props and style functions.

## Usage

Here's an example of how you can use `useAnimationState` to create a fade-in effect:

```js
import { useAnimationState } from "pearl-ui";

const fadeAnimationState = useAnimationState({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

return <Box w={30} h={100} bgColor="pink" state={fadeAnimationState} />;
```

## Parameters

| Name             | Required | Type                                                         | Default                                                            | Description                                                                                               |
| ---------------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `props`          | Yes      | <t>object</t>                                                |                                                                    | The animation state props. These are the properties that define the animation state.                      |
| `styleFunctions` | No       | <t>Array of [Style Functions](../others/style-functions)</t> | [boxStyleFunctions](../others/style-functions#box-style-functions) | Specifies the list of [style functions](../others/style-functions) for computing the received style props |
