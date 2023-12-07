import React from "react";

interface SpacingBoxProps {
  width: string;
}

const Props: React.FC<SpacingBoxProps> = ({ width }) => {
  return (
    <div style={{ width: width, height: 15, backgroundColor: "#FBB6CE" }}></div>
  );
};

export default Props;
