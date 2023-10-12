import { Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Dimensions as DimensionsType } from "./types";

export const DimensionsContext = React.createContext<DimensionsType>({
  width: 0,
  height: 0,
});

export const DimensionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dimensions, setDimensions] = useState<DimensionsType>(
    Dimensions.get("window")
  );

  const onChange = ({ window }: { window: DimensionsType }) => {
    setDimensions(window);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", onChange) ;

    return () =>
      // Using removeEventListener is deprecated in react-native > 0.65 and will throw warning. Use .remove() if available.
      subscription && subscription.remove
        ? subscription.remove()
        : undefined
  }, []);

  return (
    <DimensionsContext.Provider value={dimensions}>
      {children}
    </DimensionsContext.Provider>
  );
};
