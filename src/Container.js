import React, { useState } from "react";
import ArticleList from "./ArticleList";
import Article from "./Article";
import FeedList from "./FeedList";
import { Alert } from "reactstrap";
import Loading from "./Loading";
import MercuryParser from "./MercuryParser";
import HeaderButtons from "./HeaderButtons";
import AddRSSFeed from "./AddRSSFeed";

const Container = (props) => {
  const { data } = props;
  const [selectedArticle, setSelectedArticle] = useState(0);
  const [selectedFeed, setSelectedFeed] = useState(-1);
  const [alertOpen, setAlertOpen] = useState(true);
  const [fullArticle, setFullArticle] = useState(false);

  let currentArticle = {};
  let currentArticleList = {};
  let heading = "";

  if (selectedFeed === -1) {
    currentArticle = props.allItems[selectedArticle];
    currentArticleList = props.allItems;
    heading = "All Feeds";
  } else {
    currentArticle = data[selectedFeed].items[selectedArticle];
    currentArticleList = data[selectedFeed].items;
    heading = props.data[selectedFeed].title;
  }

  function loadFeedList() {
    if (props.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          <FeedList
            data={{ title: "All Feeds", items: props.allItems }}
            index={-1}
            selectedFeed={selectedFeed}
            setSelectedFeed={setSelectedFeed}
            setSelectedArticle={setSelectedArticle}
            setFullArticle={setFullArticle}
          />
          <br />
          {data.map((item, index) => (
            <FeedList
              data={item}
              key={index}
              index={index}
              selectedFeed={selectedFeed}
              setSelectedFeed={setSelectedFeed}
              setSelectedArticle={setSelectedArticle}
              setFullArticle={setFullArticle}
            />
          ))}
          {props.errors.length === 0 ? null : (
            <Alert
              isOpen={alertOpen}
              toggle={() => setAlertOpen(false)}
              style={{
                textAlign: "center",
                fontSize: "12px",
                margin: "2px auto 2px auto",
                // height: "35px",
                // padding: "7px 20px 7px 20px",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              color="danger"
            >
              Unable to load {props.errors.length} feeds
            </Alert>
          )}
        </div>
      );
    }
  }

  function loadArticleList() {
    if (props.loading) {
      return <div></div>;
    } else if (!props.loading) {
      return (
        <div>
          {currentArticleList.map((item, index) => (
            <ArticleList
              allArticles={data}
              data={item}
              key={index}
              index={index}
              selectedArticle={selectedArticle}
              setSelectedArticle={setSelectedArticle}
              setFullArticle={setFullArticle}
            />
          ))}
        </div>
      );
    }
  }

  function loadArticle() {
    if (props.loading) {
      return <div></div>;
    } else {
      return (
        <div>
          {fullArticle ? (
            <MercuryParser data={currentArticle} />
          ) : (
            <Article data={currentArticle} />
          )}
        </div>
      );
    }
  }

  return (
    <div className="full-page-grid">
      <div className="grid-header-left"></div>

      <div className="grid-header-middle">
        <h4>{heading}</h4>
      </div>

      <div className="grid-header-right">
        <HeaderButtons
          setFullArticle={setFullArticle}
          fullArticle={fullArticle}
          currentArticle={currentArticle}
        />
      </div>

      <div className="grid-content-left">
        {loadFeedList()}
        <AddRSSFeed />
      </div>

      <div className="grid-content-middle">{loadArticleList()}</div>

      <div className="grid-content-right">{loadArticle()}</div>
    </div>
  );
};

export default Container;
