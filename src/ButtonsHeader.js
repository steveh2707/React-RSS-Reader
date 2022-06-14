import React from "react";
import IconButton from "@mui/material/IconButton";
import ArticleIcon from "@mui/icons-material/ArticleRounded";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

function ButtonsHeader(props) {
  let iconSize = { fontSize: 28 };

  function showReaderView() {
    props.setFullArticle(!props.fullArticle);
  }
  function markUnread() {
    props.currentArticle.read = false;
  }

  return (
    <div style={{ textAlign: "right", marginRight: "20px" }}>
      <IconButton aria-label="Show Reader View" onClick={showReaderView}>
        <ArticleIcon sx={iconSize} className="buttons" />
      </IconButton>
      <IconButton aria-label="Mark as Unread" onClick={markUnread}>
        <CircleOutlinedIcon sx={iconSize} className="buttons" />
      </IconButton>
      <IconButton aria-label="Star" onClick={() => console.log("working")}>
        <StarBorderOutlinedIcon sx={iconSize} className="buttons" />
      </IconButton>
    </div>
  );
}

export default ButtonsHeader;
