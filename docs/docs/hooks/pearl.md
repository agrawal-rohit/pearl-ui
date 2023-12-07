---
sidebar_position: 10
title: pearl
---

The `pearl` hook is a powerful utility in Pearl UI that allows you to convert a third-party component into a Pearl UI-compatible component. This hook is particularly useful when you want to use a component that is not originally part of Pearl UI, but you want to leverage the power of Pearl UI's theming and style props.

## Import

```js
import { pearl } from "pearl-ui";
```

## Return value

The `pearl` hook returns a Pearl UI-compatible component that can be configured using style props, an atomic component configuration, or a molecular component configuration.

## Usage

### Creating a Basic Pearl Component

A Basic Pearl Component is a standalone component that doesn't contain any child components. It's the simplest form of a Pearl UI-compatible component. Here's a more detailed example of how you can create a Basic Pearl Component:

```tsx
import React from "react";
import { Box, Text, BoxProps, pearl, AtomComponentProps } from "pearl-ui";

export type BaseCustomComponentProps = BoxProps & {
  label: string;
};

const CustomComponent = React.forwardRef(
  (
    {
      label,
      ...props
    }: AtomComponentProps<"CustomComponent", BaseCustomComponentProps>,
    ref: any
  ) => {
    return (
      <Box ref={ref} {...props}>
        <Text>{label}</Text>
      </Box>
    );
  }
);

const BasicPearlComponent = pearl<BaseCustomComponentProps, "basic">(
  CustomComponent,
  {
    componentName: "MyBasicComponent",
    type: "basic",
    animatable: true,
  }
);

// The created component can then be used easily in your application
<BasicPearlComponent label="Hello, Pearl UI!" bgColor="red" boxShadow="lg" />;
```

In this example, `CustomComponent` is the base component that we are converting into a Pearl UI-compatible Basic Component. The `componentName` is set to "MyBasicComponent", which is a unique identifier for the component within the theme. The `type` is set to "basic", indicating that this is a standalone component. The `animatable` flag is set to true, indicating that this component can support animations.

### Creating an Atom Component

An Atom Component is a core element in Pearl UI. It can function independently or be integrated into more complex components. Here's a detailed example of creating an Atom Component using the `pearl` function and an atomic configuration:

```tsx
import React from "react";
import { Box, Text, BoxProps, pearl, AtomicCompo AtomComponentProps, AtomicComponentConfig } from "pearl-ui";

export type BaseCustomComponentProps = BoxProps & {
  label: string;
};

const CustomComponent = React.forwardRef(
  (
    {
      label,
      ...props
    }: AtomComponentProps<"CustomComponent", BaseCustomComponentProps>,
    ref: any
  ) => {
    return (
      <Box ref={ref} style={props.style}>
        <Text>{label}</Text>
      </Box>
    );
  }
);

const atomicConfig: AtomicComponentConfig = {
  baseStyle: {
    bgColor: "red",
    borderRadius: "lg",
  },
  sizes: {
    sm: {
      px: 2,
      py: 1,
    },
    md: {
      px: 3,
      py: 2,
    },
    lg: {
      px: 4,
      py: 3,
    },
  },
  variants: {
    outline: {
      borderWidth: 2,
      borderColor: "red",
      bgColor: "transparent",
    },
    solid: {
      bgColor: "red",
      boxShadow: "lg",
    },
  },
  defaults: {
    size: "md",
    variant: "solid",
  },
};

// Add the atomic configuration to the theme
theme.components.CustomComponent = atomicConfig;

const PearlAtomComponent = pearl<BaseCustomComponentProps, "atom">(
  CustomComponent,
  {
    componentName: "CustomComponent",
    type: "atom",
    animatable: true,
  }
);

// The created component can then be used easily in your application
<PearlAtomComponent size="sm" variant="outline" label="Hello, Pearl UI!" />;
```

In this example, `CustomComponent` is the base component that we are converting into a Pearl UI-compatible Atom Component. The `componentName` is set to "CustomComponent", which is a unique identifier for the component within the theme. The `type` is set to "atom", indicating that this is a basic building block component. The `animatable` flag is set to true, indicating that this component can support animations. The `atomicConfig` is an atomic configuration that defines the base styles, sizes, variants, and defaults for the component. This configuration is added to the theme, allowing it to be used across the application.

### Creating a Molecule Component

A Molecule Component is a more complex component that can contain multiple Atom Components or other Molecule Components. Here's a detailed example of creating a Molecule Component using the `pearl` function and a molecular configuration:

```tsx
import React from "react";
import {
  Box,
  Text,
  VStack,
  BoxProps,
  pearl,
  MoleculeComponentProps,
  MolecularComponentConfig,
} from "pearl-ui";

export type BaseCustomComponentProps = BoxProps & {
  firstLabel: string;
  secondLabel: string;
};

const CustomComponent = React.forwardRef(
  (
    {
      firstLabel,
      secondLabel,
      atoms,
      ...props
    }: MoleculeComponentProps<"CustomComponent", BaseCustomComponentProps>,
    ref: any
  ) => {
    return (
      <VStack ref={ref}>
        <Box {...atoms.first}>
          <Text>{firstLabel}</Text>
        </Box>

        <Box {...atoms.second}>
          <Text>{secondLabel}</Text>
        </Box>
      </VStack>
    );
  }
);

const molecularConfig: MolecularComponentConfig = {
  parts: ["first", "second"],
  baseStyle: {
    first: {
      backgroundColor: "blue",
      color: "white",
      padding: 2,
    },
    second: {
      backgroundColor: "green",
      color: "white",
      padding: 2,
    },
  },
  sizes: {
    sm: {
      first: {
        fontSize: 5,
      },
      second: {
        fontSize: 5,
      },
    },
    md: {
      first: {
        fontSize: 10,
      },
      second: {
        fontSize: 10,
      },
    },
    lg: {
      first: {
        fontSize: 15,
      },
      second: {
        fontSize: 15,
      },
    },
  },
  variants: {
    outline: {
      first: {
        borderWidth: 1,
        borderColor: "black",
      },
      second: {
        borderWidth: 1,
        borderColor: "blue",
      },
    },
    filled: {
      first: {
        borderWidth: 0,
      },
      second: {
        borderWidth: 0,
      },
    },
  },
  defaults: {
    size: "sm",
    variant: "outline",
  },
};

// Add the molecular configuration to the theme
theme.components.CustomComponent = molecularConfig;

const PearlMoleculeComponent = pearl<BaseCustomComponentProps, "molecule">(
  CustomComponent,
  {
    componentName: "CustomComponent",
    type: "molecule",
    animatable: true,
  }
);

// The created component can then be used easily in your application
<PearlMoleculeComponent size="sm" variant="filled" label="Hello, Pearl UI!" />;
```

In this example, `CustomComponent` is the foundational component that we are transforming into a Pearl UI-compatible Molecule Component. The `componentName` is set to "CustomComponent", which serves as a unique identifier for the component within the theme. The `type` is set to "molecule", signifying that this is a sophisticated component that can encapsulate multiple Atom Components. The `animatable` flag is set to true, indicating that this component can support animations. The `molecularConfig` is a molecular configuration that outlines the base styles, sizes, variants, and defaults for the component. This configuration is incorporated into the theme, enabling it to be utilized across the application.

## Parameters

| Name             | Required | Type                                                                                       | Default                                                            | Description                                                                                                                                                                                                                              |
| ---------------- | -------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Component`      | Yes      | <t>React.Component</t>                                                                     |                                                                    | The base component that will be transformed into a Pearl UI-compatible component.                                                                                                                                                        |
| `config`         | Yes      | <t>{componentName: string, type: "basic" \| "atom" \| "molecule", animatable: boolean}</t> |                                                                    | An object that provides necessary metadata for the Pearl UI component. The `config` object includes:                                                                                                                                     |
|                  |          |                                                                                            |                                                                    | - `componentName`: The name of the component in the theme _(Note: This name is crucial when the desired component should be an atom or a molecule, as pearl will search for the component configuration in the theme using this label)_. |
|                  |          |                                                                                            |                                                                    | - `type`: Defines the type of the component.                                                                                                                                                                                             |
|                  |          |                                                                                            |                                                                    | - `animatable`: A flag that indicates whether the component supports animations or not.                                                                                                                                                  |
| `styleFunctions` | No       | <t>Array of [Style Functions](../others/style-functions)</t>                               | [boxStyleFunctions](../others/style-functions#box-style-functions) | An array of [style functions](../others/style-functions) that are used to compute the received style props.                                                                                                                              |
