import useThemeContext from "@theme/hooks/useThemeContext"; //docs: https://v2.docusaurus.io/docs/2.0.0-alpha.69/theme-classic#usethemecontext
import ExpoSnack from "react-expo-snack";
import React from "react";

interface ExpoSnackProps {
  snackId: string;
}

const Snack: React.FC<ExpoSnackProps> = ({ snackId }) => {
  const { isDarkTheme } = useThemeContext();

  return (
    <ExpoSnack
      id={snackId}
      preview={true}
      platform="web"
      theme={isDarkTheme ? "dark" : "light"}
    />
  );
};

export default Snack;
