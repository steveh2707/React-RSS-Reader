import React, { useState } from "react";
import ArticleList from "./ArticleList";
import EachArticle from "./EachArticle";

const Container = (props) => {
  const { data } = props;
  const items = data.items;
  const [selectedArticle, setSelectedArticle] = useState(0);

  return (
    <div className="background">
      <div className="columnArticleList">
        {items.map((item, index) => (
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
