import React from "react";
import nothingHere from "../images/2953962.jpg";

const EmptyPage = () => {
  return (
    <div className="row">
      <img
        src={nothingHere}
        className="mx-auto"
        style={{ height: "500px", width: "500px", marginTop: "100px" }}
      />
    </div>
  );
};

export default EmptyPage;
