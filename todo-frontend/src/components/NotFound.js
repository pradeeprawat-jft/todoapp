import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
      }}
    >
      <div
        style={{
          height: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 className="px-3 text-uppercase text-warning">Nothing here </h2>
      </div>
    </div>
  );
};

export default NotFound;
