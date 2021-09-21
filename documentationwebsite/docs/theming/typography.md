---
sidebar_position: 2
title: Customize Theme
---

## Typography 

### Updating the font family

Pearl UI uses [Poppins](https://fonts.google.com/specimen/Poppins) as the font family in the default theme configuration (More information in the **Theme** section). The font can be easily added to your app through the following steps:

#### Download the [Poppins](https://fonts.google.com/specimen/Poppins) family

You can download the entire font family if you desire, but only the following variants are **necessary**:

1. **Thin** - 100
2. **ExtraLight** - 200
3. **Light** - 300
4. **Regular** - 400
5. **Medium** - 500
6. **SemiBold** - 600
7. **Bold** - 700
8. **ExtraBold** - 800

```
├── fonts
│   ├── Poppins-Black.ttf
│   ├── Poppins-Bold.ttf
│   ├── Poppins-ExtraBold.ttf
│   ├── Poppins-ExtraLight.ttf
│   ├── Poppins-Light.ttf
│   ├── Poppins-Medium.ttf
│   ├── Poppins-Regular.ttf
│   ├── Poppins-SemiBold.ttf
│   └── Poppins-Thin.ttf
```

```jsx
import { useFonts } from "expo-font";

const [haveFontsLoaded] = useFonts({
  "Poppins-Regular": require("./src/fonts/Poppins-Regular.ttf"),
  "Poppins-SemiBold": require("./src/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Bold": require("./src/fonts/Poppins-Bold.ttf"),
  "Poppins-ExtraBold": require("./src/fonts/Poppins-ExtraBold.ttf"),
  "Poppins-ExtraLight": require("./src/fonts/Poppins-ExtraLight.ttf"),
  "Poppins-Light": require("./src/fonts/Poppins-Light.ttf"),
  "Poppins-Medium": require("./src/fonts/Poppins-Medium.ttf"),
  "Poppins-Thin": require("./src/fonts/Poppins-Thin.ttf"),
});
```
