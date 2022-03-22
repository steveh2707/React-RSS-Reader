import React from "react";
import dateTransformer from "./dateTransformer";

const ArticleList = (props) => {
  // const htmlString = props.data.content;

  function onClick() {
    props.setSelectedArticle(props.index);
    props.data.read = true;
    // console.log(props.data);
  }

  // console.log(props.data);

  return (
    <button
      className={`articleList ${props.data.read ? "articleListRead" : ""} ${
        props.selectedArticle === props.index ? "articleListSelected" : ""
      }`}
      onClick={onClick}
    >
      <div>
        <div>
          <div
            style={{
              fontVariant: "small-caps",
              fontSize: "smaller",
              // fontWeight: "bold",
              color: "gray",
              padding: "0px",
              margin: "0px",
              float: "right",
            }}
          >
            {dateTransformer(props.data.isoDate)}
          </div>
          <div
            style={{
              fontVariant: "small-caps",
              fontSize: "small",
              fontWeight: "bold",
              color: "gray",
            }}
          >
            {props.data.feed}
          </div>

          <p className="listTitle">{props.data.title}</p>
          {/* <p>{props.data.pubDate.toString()}</p> */}
          <p className="listSnippet">
            {props.data.contentSnippet.substring(0, 150)}...
          </p>
          {/* <a className="listLink" href={props.data.link}>
            Continue Reading
          </a> */}
        </div>
      </div>
    </button>
  );
};

export default ArticleList;
