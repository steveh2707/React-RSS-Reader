import React from "react";
import dateTransformer from "./dateTransformer";

const ArticleListItem = (props) => {
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
          <div className="articleListDate">
            {dateTransformer(props.data.isoDate)}
          </div>

          <div className="articleListFeedTitle">{props.data.feed}</div>

          {props.data.content.includes("img") ? (
            <div className="flex-article">
              <div className="flex-article-text">
                <div className="articleListTitle">{props.data.title}</div>
                <div className="articleListSnippet">
                  {props.data.contentSnippet.substring(0, 110)}...
                </div>
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
              <div className="articleListTitle">{props.data.title}</div>
              <div className="articleListSnippet">
                {props.data.contentSnippet.substring(0, 140)}...
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default ArticleListItem;
