import React from "react";
import styles from "./ElevationBox.module.css";

interface BorderRadiiBoxProps {
  keyName: string;
  shadowValue: string;
}

const ElevationBox: React.FC<BorderRadiiBoxProps> = ({
  keyName,
  shadowValue,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.swatch} style={{ boxShadow: shadowValue }}>
        &ldquo;{keyName}&rdquo;
      </div>
    </div>
  );
};

export default ElevationBox;
