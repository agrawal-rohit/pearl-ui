import React from "react";
import { ThemeProvider } from "@shopify/restyle";

import Storybook from "./storybook";
import theme from "./src/theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <Storybook />
  </ThemeProvider>
);

export default App;
