import React from "react";

const FeedList = (props) => {
  return (
    <div>
      <button
        className="FeedList"
        onClick={() => props.setSelectedFeed(props.index)}
      >
        <div>
          <div>
            <h3>{props.data.title}</h3>
            {/* <p>{props.data.link}</p> */}
          </div>
        </div>
      </button>
    </div>
  );
};

export default FeedList;
