import React from "react";
import styles from "./ComponentPreview.module.css";
import useThemeContext from "@theme/hooks/useThemeContext";

interface ComponentPreviewProps {
  label: string;
  imageSrc: string;
  docPath: string;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  label,
  imageSrc,
  docPath,
  ...props
}) => {
  const { isDarkTheme } = useThemeContext();

  return (
    <a
      href={docPath}
      className={styles.container}
      style={
        isDarkTheme
          ? {
              backgroundColor: "#2E3A59",
              borderColor: "#58617A",
            }
          : undefined
      }
      {...props}
    >
      <img src={imageSrc} className={styles.image} />
      <div className={styles.labelBox}>
        <p
          className={styles.label}
          style={
            isDarkTheme
              ? {
                  color: "white",
                }
              : undefined
          }
        >
          {label}
        </p>
      </div>
    </a>
  );
};

export default ComponentPreview;
