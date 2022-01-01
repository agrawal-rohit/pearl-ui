---
sidebar_position: 3
title: Responsivity
---

Pearl UI supports responsive styles out of the box! Any [style props](./style-props) can _optionally_ accept a value for each screen size, as defined by the [breakpoints configuration](../theming/default-theme#breakpoints) in the theme.

To add make a style responsive, you can use the following object syntax:

```jsx
propName={{ breakpoint: propValue }}
```

## Adding responsivity to custom props

In addition to the included [style props](./style-props), you can easily add responsivity to any custom props you want using the [useResponsiveProp](../hooks/useResponsiveProp) hook.

## Example

<p float="left" align="center">
<img src="/img/responsivity_phone_demo.png" alt="welcome" width="200"/>
<img src="/img/responsivity_tablet_demo.png" alt="welcome" width="500"/>
</p>

```jsx
const Header = (props) => {
  const heading = useResponsiveProp({
    phone: "I am a phone",
    tablet: "I am a tablet",
  });

  return (
    <Text
      mb="m"
      variant="h2"
      alignSelf={{ phone: "center", tablet: "flex-start" }}
    >
      {heading}
    </Text>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Screen>
        <Header />
        <Box flexDirection={{ phone: "column", tablet: "row" }}>
          <Center
            backgroundColor="cornflowerblue"
            p="4xl"
            flex={1}
            borderRadius="l"
          >
            <Text color="neutral.50" variant={{ phone: "p2", tablet: "st1" }}>
              Item 1
            </Text>
          </Center>
          <Center
            backgroundColor="coral"
            p="4xl"
            flex={1}
            borderRadius="l"
            marginVertical={{ phone: "l", tablet: null }}
            marginHorizontal={{ phone: null, tablet: "l" }}
          >
            <Text color="neutral.50" variant={{ phone: "p2", tablet: "st1" }}>
              Item 2
            </Text>
          </Center>
          <Center backgroundColor="deeppink" p="4xl" flex={1} borderRadius="l">
            <Text color="neutral.50" variant={{ phone: "p2", tablet: "st1" }}>
              Item 3
            </Text>
          </Center>
        </Box>
      </Screen>
    </ThemeProvider>
  );
};
```
