import React from "react";

const FeedListItem = (props) => {
  let count = 0;

  for (let i = 0; i < props.data.items.length; i++) {
    if (props.data.items[i].read === false) {
      count++;
    }
  }

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
          props.setFullArticle(false);
        }}
      >
        <div
          style={{
            width: "87%",
            float: "left",
            // marginRight: "-100px",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {props.data.title}
        </div>

        <div
          style={{
            textAlign: "right",
            fontWeight: "normal",
            color: "gray",
          }}
        >
          {count !== 0 ? count : ""}
        </div>
      </button>
    </div>
  );
};

export default FeedListItem;
