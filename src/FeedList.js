import React from "react";

const FeedList = (props) => {
  let count = 0;

  for (let i = 0; i < props.data.items.length; i++) {
    if (props.data.items[i].read === false) {
      count++;
    }
  }

  let charLimit = 23;

  return (
    <div>
      <button
        className={`FeedList ${
          props.selectedFeed === props.index ? "FeedListSelected" : ""
        }`}
        onClick={() => {
          props.setSelectedFeed(props.index);
          props.setSelectedArticle(0);
          props.data.items[0].read = true;
        }}
      >
        <div style={{ width: "100%", float: "left", marginRight: "-100px" }}>
          {props.data.title.substring(0, charLimit)}
          {props.data.title.length > charLimit ? "..." : ""}
        </div>

        <div
          style={{ textAlign: "right", fontWeight: "normal", color: "gray" }}
        >
          {count !== 0 ? count : ""}
        </div>
      </button>
    </div>
  );
};

export default FeedList;
