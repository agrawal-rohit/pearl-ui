import React from "react";
import styles from "./TypographyVariant.module.css";

interface TypographyVariantProps {
  variantName: string;
  variantStyle: object;
  exampleText: string;
}

const TypographyVariant: React.FC<TypographyVariantProps> = ({
  variantName,
  variantStyle,
  exampleText,
}) => {
  const renderMetaData = (metadata: object) => {
    return (
      <div className={styles.metaDataContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p
            className={styles.metaDataKey}
            style={{
              fontSize: 15,
              color: "var(--hero-description-text-color)",
            }}
          >
            Variant:{" "}
          </p>
          <p
            className={styles.metaData}
            style={{
              fontSize: 15,
              color: "var(--hero-description-text-color)",
            }}
          >
            {variantName}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {Object.keys(metadata).map((key, i) => {
            const data =
              i < Object.keys(metadata).length - 1
                ? `${metadata[key]} |`
                : metadata[key];
            return (
              <>
                <p key={i} className={styles.metaDataKey}>
                  {key}:{" "}
                </p>
                <p key={i} className={styles.metaData}>
                  {data}
                </p>
              </>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {renderMetaData(variantStyle)}
      <p style={{ ...variantStyle, lineHeight: 1.5 }}>{exampleText}</p>
    </div>
  );
};

export default TypographyVariant;
