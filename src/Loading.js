import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div className="loading">
      <Spinner>Loading...</Spinner>
    </div>
  );
};

export default Loading;
