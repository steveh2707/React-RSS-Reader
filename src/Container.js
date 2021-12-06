import React, { useState } from "react";
import ArticleList from "./ArticleList";
import EachArticle from "./EachArticle";
import FeedList from "./FeedList";

const Container = (props) => {
  const { data } = props;
  const [selectedArticle, setSelectedArticle] = useState(0);
  const [selectedFeed, setSelectedFeed] = useState(0);
  const items = data[selectedFeed].items;

  return (
    <div className="background">
      <div className="columnNav">
        <h2 style={{ textAlign: "center" }}>Feeds</h2>
        {data.map((item, index) => (
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
        {data[selectedFeed].items.map((item, index) => (
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
        <EachArticle data={items[selectedArticle]} />
      </div>
    </div>
  );
};

export default Container;
