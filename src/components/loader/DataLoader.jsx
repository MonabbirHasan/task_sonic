import React from "react";
import { ThreeCircles } from "react-loader-spinner";
const DataLoader = ({ height, width }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThreeCircles
        color="var(--primary-color)"
        height={height}
        width={width}
      />
    </div>
  );
};

export default DataLoader;
