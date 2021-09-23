import React from "react";
import Storybook from "./storybook";
import Screen from "./src/components/Atoms/Screen/Screen";
import { ThemeProvider } from "./src/theme/src/themeContext";

const App = () => {
  return (
    <ThemeProvider defaultColorMode="light">
      <Storybook />
      {/* <OfflineNotice />
      <Screen>
        <Button onPress={() => console.log(2)}>Test</Button>
      </Screen> */}
    </ThemeProvider>
  );
};

export default App;
