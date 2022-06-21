import React from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function ButtonsFooterArticle(props) {
  let iconSize = { fontSize: 25 };

  function nextArticle() {
    props.setSelectedArticle(props.selectedArticle + 1);
    props.currentArticle.read = true;
    props.setFullArticle(false);
  }

  return (
    <div style={{ textAlign: "center", marginTop: "-5px" }}>
      <IconButton aria-label="Mark as Unread" onClick={nextArticle}>
        <KeyboardArrowDownIcon sx={iconSize} className="buttons" />
      </IconButton>
    </div>
  );
}

export default ButtonsFooterArticle;
