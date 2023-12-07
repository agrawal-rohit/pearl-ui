---
sidebar_position: 3
title: Design Principles
---

## Atomic Design Principles

![Atomic Design](https://miro.medium.com/max/2000/1*V5oi-JrH4RlEQuYdVrQXig.png)

Pearl UI is built on the principles of [Atomic Design](https://atomicdesign.bradfrost.com/), a methodology that promotes the creation of design systems in a structured, hierarchical manner. The Atomic Design methodology consists of five distinct stages, each building upon the previous one, creating a comprehensive design system:

1. **Atoms** - These are the smallest, indivisible components of the system, such as buttons, icons, inputs, labels, and other minor elements that are used throughout the design.

2. **Molecules** - Atoms are grouped together in various combinations to form molecules. Each molecule is unique and possesses its own characteristics, style, and format.

3. **Organisms** - Organisms are complex UI components that are composed of groups of molecules and atoms. While not a complete design, an organism is a reusable component that can be used across different designs or layout templates.

4. **Templates** - Templates represent the layout of a page where organisms and other elements are arranged to form a cohesive design. It's the first stage in the Atomic Design methodology that doesn't correspond to a stage in the molecular world, but it's crucial for the methodology.

5. **Pages** - Pages are specific instances of templates filled with representative data. As data changes (e.g., different user information or languages), it may affect the design of a template. Creating pages allows for testing these variations and making global adaptations to your templates.

By adhering to these principles, Pearl UI ensures a consistent, scalable, and maintainable design system that can adapt to varying project requirements.
