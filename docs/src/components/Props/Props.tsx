import React from "react";
import styles from "./Props.module.css";

interface PropSectionProps {
  name: string;
  description: string;
  type: string;
}

const Props: React.FC<PropSectionProps> = ({ name, description, type }) => {
  const renderDataRow = (title: string, content: string) => {
    return (
      <div className={styles.row}>
        <p className={styles.infoTitle}>{title}</p>
        <div className={styles.contentContainer}>
          <p
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content }}
          ></p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <p className={styles.propName}>{name}</p>
      <hr className={styles.divider} />
      {renderDataRow("Description", description)}
      {renderDataRow("Type", type)}
    </div>
  );
};

export default Props;
