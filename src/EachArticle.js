import React from "react";

function EachArticle(props) {
  const htmlString = props.data.content;

  return (
    <div className="article">
      <h2>{props.data.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  );
}

export default EachArticle;
