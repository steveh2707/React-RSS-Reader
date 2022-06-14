import React from "react";
import IconButton from "@mui/material/IconButton";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

function ButtonsFooterList(props) {
  let iconSize = { fontSize: 25 };

  return (
    <div style={{ textAlign: "center", marginTop: "-2px" }}>
      <IconButton aria-label="Mark as Unread">
        <CircleOutlinedIcon sx={iconSize} className="buttons" />
      </IconButton>
      <IconButton aria-label="Star" onClick={() => console.log("working")}>
        <StarBorderOutlinedIcon sx={iconSize} className="buttons" />
      </IconButton>
    </div>
  );
}

export default ButtonsFooterList;
