import React, { useState } from "react";
import ArticleList from "./ArticleList";
import EachArticle from "./EachArticle";
import FeedList from "./FeedList";

const Container = (props) => {
  const { data } = props;
  const [selectedArticle, setSelectedArticle] = useState(0);
  const [selectedFeed, setSelectedFeed] = useState(0);

  const filteredData = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i] !== "RSS Feed not loaded") filteredData.push(data[i]);
  }

  return (
    <div className="background">
      <div className="columnNav">
        <h2 style={{ textAlign: "center" }}>Feeds</h2>
        {filteredData.map((item, index) => (
          <FeedList
            data={item}
            key={index}
            index={index}
            setSelectedFeed={setSelectedFeed}
          />
        ))}
      </div>
      <div className="columnSpace"></div>
      <div className="columnArticleList">
        {filteredData[selectedFeed].items.map((item, index) => (
          <ArticleList
            data={item}
            key={index}
            index={index}
            setSelectedArticle={setSelectedArticle}
          />
        ))}
      </div>
      <div className="columnSpace"></div>
      <div className="columnArticle">
        <EachArticle data={filteredData[selectedFeed].items[selectedArticle]} />
      </div>
    </div>
  );
};

export default Container;
