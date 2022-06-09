import React from "react";
import dateTransformer from "./dateTransformer";

const ArticleList = (props) => {
  // const htmlString = props.data.content;

  function onClick() {
    props.setSelectedArticle(props.index);
    props.data.read = true;
    // console.log(props.data);
    props.setFullArticle(false);
  }
  function onDoubleClick() {
    props.setSelectedArticle(props.index);
    props.data.read = true;
    props.setFullArticle(true);
  }

  // console.log(props.data);
  // if (props.data.content.includes("img")) {
  //   console.log(props.data.content.match(/\<img(.*?)\/>/i)[0]);
  // }

  return (
    <button
      className={`articleList ${props.data.read ? "articleListRead" : ""} ${
        props.selectedArticle === props.index ? "articleListSelected" : ""
      }`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="article-grid">
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

          <div className="flex-article-image">
            {props.data.content.includes("img") ? (
              <div className="flex-article">
                <div className="flex-article-text">
                  <p className="listTitle">{props.data.title}</p>
                  {/* <p>{props.data.pubDate.toString()}</p> */}
                  <p className="listSnippet">
                    {props.data.contentSnippet.substring(0, 110)}...
                  </p>
                </div>
                <div className="flex-article-image">
                  <div
                    dangerouslySetInnerHTML={{
                      //eslint-disable-next-line
                      __html: props.data.content.match(/\<img(.*?)\/>/i)[0],
                    }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <p className="listTitle">{props.data.title}</p>
                {/* <p>{props.data.pubDate.toString()}</p> */}
                <p className="listSnippet">
                  {props.data.contentSnippet.substring(0, 140)}...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ArticleList;
