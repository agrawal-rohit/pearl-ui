import React from "react";
import styles from "./BorderRadiiBox.module.css";

interface BorderRadiiBoxProps {
  keyName: string;
  radius: number;
}

const BorderRadiiBox: React.FC<BorderRadiiBoxProps> = ({ keyName, radius }) => {
  return (
    <div className={styles.container}>
      <div className={styles.swatch} style={{ borderRadius: radius }}>
        &ldquo;{keyName}&rdquo;
      </div>
    </div>
  );
};

export default BorderRadiiBox;
