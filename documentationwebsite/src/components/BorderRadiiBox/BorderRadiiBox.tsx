import React from "react";
import styles from "./BorderRadiiBox.module.css";

interface BorderRadiiBoxProps {
  keyName: string;
  radius: number;
}

const BorderRadiiBox: React.FC<BorderRadiiBoxProps> = ({ keyName, radius }) => {
  return (
    <div className={styles.container}>
      <div className={styles.swatch} style={{ borderRadius: radius }}></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        <p className={styles.colorName}>"{keyName}"</p>
        <p className={styles.colorValue}>{radius}</p>
      </div>
    </div>
  );
};

export default BorderRadiiBox;
