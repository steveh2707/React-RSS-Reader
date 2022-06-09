import React from "react";
import IconButton from "@mui/material/IconButton";
import ArticleIcon from "@mui/icons-material/ArticleRounded";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

function HeaderButtons(props) {
  let iconSize = { fontSize: 30 };
  let colour = "primary";

  function showReaderView() {
    props.setFullArticle(!props.fullArticle);
  }
  // function markUnread() {

  // }

  return (
    <div style={{ textAlign: "right", marginRight: "20px" }}>
      <IconButton aria-label="Show Reader View">
        <ArticleIcon sx={iconSize} onClick={showReaderView} color={colour} />
      </IconButton>
      <IconButton aria-label="Mark as Unread">
        <CircleOutlinedIcon
          sx={iconSize}
          onClick={() => console.log("working")}
          color={colour}
        />
      </IconButton>
      <IconButton aria-label="Star">
        <StarBorderOutlinedIcon
          sx={iconSize}
          onClick={() => console.log("working")}
          color={colour}
        />
      </IconButton>
    </div>
  );
}

export default HeaderButtons;
