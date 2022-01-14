import React from "react";

function EachArticle(props) {
  const htmlString = props.data.content;

  return (
    <div className="article">
      <h3>{props.data.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      {/* <a href={props.data.link}>Continue Reading</a> */}
    </div>
  );
}

export default EachArticle;
