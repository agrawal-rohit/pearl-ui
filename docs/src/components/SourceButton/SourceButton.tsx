import React from "react";
import styles from "./SourceButton.module.css";
import { FaGithub } from "react-icons/fa";
import useThemeContext from "@theme/hooks/useThemeContext";

interface SourceButtonProps {
  href?: string;
  label: string;
}

const SourceButton: React.FC<SourceButtonProps> = ({
  label,
  href,
  ...props
}) => {
  const { isDarkTheme } = useThemeContext();

  return (
    <a
      href={href}
      target="_blank"
      className={styles.button}
      {...props}
      style={{
        ...(isDarkTheme
          ? {
              backgroundColor: "#2E3A59",
              borderColor: "#58617A",
            }
          : {}),
        ...(props as any).style,
      }}
    >
      <FaGithub
        className={styles.icon}
        style={
          isDarkTheme
            ? {
                color: "white",
              }
            : undefined
        }
      />
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
    </a>
  );
};

export default SourceButton;
