import React from "react";

const FeedList = (props) => {
  return (
    <div>
      <button
        className={`FeedList ${
          props.selectedFeed === props.index ? "FeedListSelected" : ""
        }`}
        onClick={() => {
          props.setSelectedFeed(props.index);
          props.setSelectedArticle(0);
        }}
      >
        {props.data.title}
      </button>
    </div>
  );
};

export default FeedList;
