import React from "react";

function Article(props) {
  const htmlString = props.data.content;
  // const date = new Date(props.data.pubDate);

  // console.log(typeof props.data.pubDate);
  // console.log(date);

  return (
    <div className="article">
      <a href={props.data.link}>
        <button className={"articleHeading"} style={{ width: "100%" }}>
          <small>{props.data.pubDate}</small>
          <h3>{props.data.title}</h3>
          <small
            style={{
              fontVariant: "small-caps",
            }}
          >
            {props.data.feed}
          </small>
        </button>
      </a>

      <div
        className="articleBody"
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
      {/* <a href={props.data.link}>Continue Reading</a> */}
    </div>
  );
}

export default Article;
