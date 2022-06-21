import React from "react";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";

function ButtonsHeaderFeeds() {
  let iconSize = { fontSize: 25 };

  return (
    <div style={{ textAlign: "right", marginRight: "5px" }}>
      <IconButton aria-label="Show Reader View">
        <RefreshIcon sx={iconSize} className="buttons" />
      </IconButton>
    </div>
  );
}

export default ButtonsHeaderFeeds;
