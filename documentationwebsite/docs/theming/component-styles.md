---
sidebar_position: 3
title: Component Styles 🚧
---

Creating, managing, and custommizing components as your project evolves and pivots over time can be extremely challenging. Writing new visual styles for components in a way that is scalable and readable can hinder developer productivity and reduce delivery speed for your application.

In order to deal with this, Pearl UI implements a way to manage your components through a single json object, heavily inspired from the `styleConfig` API implemented in [Chakra UI](https://chakra-ui.com/docs/theming/component-style). It provides a consistent theming API that makes component styling easy to understand and maintain.

## Atoms and Molecules

Pearl UI follows the [Atomic Design](https://atomicdesign.bradfrost.com/) methodology which ideates the practice of creating design systems components in a bottom-up fashion to maintain an explicit order and hierarchy. There are five distinct stages of the _Atomic Design_ methodology, with the first three modelled after their equivalents in the Chemistry world. Each stage builds on the previous, acting as an aggregate of items from the preceding stages:

1. **Atoms** - The smallest building blocks in the system, eg. buttons, icons, inputs, labels, and other small elements that get used throughout a design.

2. **Molecules** - Atoms are combined in different ways to create unique molecules for use in a design, each with their own characteristics, style, and format.

3. **Organisms** - The organism is not yet a complete design, but is a component that can be reused across designs, or layout templates.

4. **Templates** - The template is the first stage of the Atomic Design methodology that does not align to a stage in the molecular world, but is important for Atomic Design. A template is where organisms and other elements are curated into a cohesive design.

5. **Pages** - This is where instances of templates are created. As data changes, different profile information, or languages may impact a template design. Building out to the page stage allows you to test for these variations and make adaptations globally to your templates.

![Atomic Design](https://miro.medium.com/max/2000/1*V5oi-JrH4RlEQuYdVrQXig.png)
