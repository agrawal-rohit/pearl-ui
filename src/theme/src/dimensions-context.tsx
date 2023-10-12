import { Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Dimensions as DimensionsType } from "./types";

export const DimensionsContext = React.createContext<DimensionsType>({
  width: 0,
  height: 0,
});

/**
 * Provides the dimensions of the window to the app.
 * @param children The children to render.
 */
export const DimensionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Initialize dimensions state with the current window dimensions.
  const [dimensions, setDimensions] = useState<DimensionsType>(
    Dimensions.get("window")
  );

  // Update dimensions state when the window dimensions change.
  const onChange = ({ window }: { window: DimensionsType }) => {
    setDimensions(window);
  };

  // Add a listener for window dimension changes.
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", onChange);

    // Remove the listener when the component unmounts.
    return () =>
      // Using removeEventListener is deprecated in react-native > 0.65 and will throw warning. Use .remove() if available.
      subscription && subscription.remove ? subscription.remove() : undefined;
  }, []);

  // Render the children with the dimensions context provider.
  return (
    <DimensionsContext.Provider value={dimensions}>
      {children}
    </DimensionsContext.Provider>
  );
};
