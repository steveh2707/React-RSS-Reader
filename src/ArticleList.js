import React from "react";

const ArticleList = (props) => {
  // const htmlString = props.data.content;

  return (
    <button
      className="articleList"
      onClick={() => props.setSelectedArticle(props.index)}
    >
      <div>
        <div>
          <h2>{props.data.title}</h2>
          <p>{props.data.pubDate.toString()}</p>
          <p>{props.data.contentSnippet.substring(0, 190)}...</p>
        </div>
      </div>
    </button>
  );
};

export default ArticleList;
