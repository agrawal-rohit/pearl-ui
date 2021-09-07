import React from "react";
import { ThemeProvider } from "./src/themeContext";
import Storybook from "./storybook";

const App = () => (
  <ThemeProvider>
    <Storybook />
  </ThemeProvider>
);

export default App;
