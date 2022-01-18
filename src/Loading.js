import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    // <div className="background">
    <div
      style={{
        position: "relative",
        height: "inherit",
        width: "inherit",
        top: "40%",
        left: "50%",
      }}
    >
      <Spinner>Loading...</Spinner>
    </div>
    // {/* </div> */}
  );
};

export default Loading;
