import React from "react";
import styles from "./PaletteColor.module.css";

interface PaletteColorProps {
  colorName: string;
  colorValue: string;
  border?: string;
}

const PaletteColor: React.FC<PaletteColorProps> = ({
  colorName,
  colorValue,
  border = "none",
}) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.swatch}
        style={{ backgroundColor: colorValue, border: border }}
      ></div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p className={styles.colorName}>{colorName}</p>
        <p className={styles.colorValue}>{colorValue}</p>
      </div>
    </div>
  );
};

export default PaletteColor;
