import React, { useState, useEffect } from "react";
import dateTransformer from "./dateTransformer";
import Mercury from "@postlight/mercury-parser";
import DOMPurify from "dompurify";

function MercuryParser(props) {
  // const htmlString = props.data.content;
  const [content, setContent] = useState("");
  // const date = new Date(props.data.pubDate);

  // console.log(typeof props.data.pubDate);
  // console.log(props.data);

  useEffect(() => {
    const CORS_PROXY = "https://young-cliffs-38123.herokuapp.com/";
    Mercury.parse(CORS_PROXY + props.data.link).then((result) =>
      // console.log(result)
      setContent(result)
    );
    return () => {
      setContent("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  console.log(content);

  return (
    <div className="article">
      <a href={props.data.link}>
        <button className={"articleHeading"} style={{ width: "100%" }}>
          <small>{dateTransformer(props.data.isoDate)}</small>
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

      <img src={content.lead_image_url} alt="new" />

      <div
        className="articleBody"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content.content),
        }}
      />
      {/* <a href={props.data.link}>Continue Reading</a> */}
    </div>
  );
}

export default MercuryParser;
