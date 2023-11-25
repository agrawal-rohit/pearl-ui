import React from "react";
import styles from "./SourceButton.module.css";
import { FaGithub } from "react-icons/fa";

interface SourceButtonProps {
  href?: string;
  label: string;
}

const SourceButton: React.FC<SourceButtonProps> = ({
  label,
  href,
  ...props
}) => {
  return (
    <a href={href} target="_blank" className={styles.button} {...props}>
      <FaGithub className={styles.icon} />
      <p className={styles.label}>{label}</p>
    </a>
  );
};

export default SourceButton;
