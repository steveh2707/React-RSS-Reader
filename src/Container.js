import React, { useState } from "react";
import ArticleListItem from "./ArticleListItem";
import Article from "./Article";
// import FeedListItem from "./FeedListItem";
// import { Alert } from "reactstrap";
// import Loading from "./Loading";
import MercuryParser from "./MercuryParser";
import ButtonsHeader from "./ButtonsHeader";
import AddRSSFeed from "./AddRSSFeed";
import FeedList from "./FeedList";
import Loading from "./Loading";
import ButtonsFooterList from "./ButtonsFooterList";
import ButtonsFooterArticle from "./ButtonsFooterArticle";
import ButtonsHeaderFeeds from "./ButtonsHeaderFeeds";

const Container = (props) => {
  const {
    data,
    allItems,
    loading,
    errors,
    rssInput,
    setRssInput,
    setRssFeeds,
  } = props;
  const [selectedArticle, setSelectedArticle] = useState(0);
  const [selectedFeed, setSelectedFeed] = useState(-1);
  const [alertOpen, setAlertOpen] = useState(true);
  const [fullArticle, setFullArticle] = useState(false);

  let currentArticle = {};
  let currentArticleList = {};
  let heading = "";

  if (selectedFeed === -1) {
    currentArticle = allItems[selectedArticle];
    currentArticleList = allItems;
    heading = "All Feeds";
  } else {
    currentArticle = data[selectedFeed].items[selectedArticle];
    currentArticleList = data[selectedFeed].items;
    heading = data[selectedFeed].title;
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="full-page-grid">
        <div className="grid-header-left">
          <ButtonsHeaderFeeds />
        </div>

        <div className="grid-header-middle">
          <h4>{heading}</h4>
        </div>

        <div className="grid-header-right">
          <ButtonsHeader
            setFullArticle={setFullArticle}
            fullArticle={fullArticle}
            currentArticle={currentArticle}
          />
        </div>

        <div className="grid-content-left">
          {
            <FeedList
              loading={loading}
              data={data}
              allItems={allItems}
              selectedFeed={selectedFeed}
              setSelectedFeed={setSelectedFeed}
              setSelectedArticle={setSelectedArticle}
              setFullArticle={setFullArticle}
              alertOpen={alertOpen}
              setAlertOpen={setAlertOpen}
              errors={errors}
            />
          }
          <AddRSSFeed
            rssInput={rssInput}
            setRssInput={setRssInput}
            setRssFeeds={setRssFeeds}
          />
        </div>

        <div className="grid-content-middle">
          {currentArticleList.map((item, index) => (
            <ArticleListItem
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

        <div className="grid-content-right">
          {fullArticle ? (
            <MercuryParser data={currentArticle} />
          ) : (
            <Article data={currentArticle} />
          )}
        </div>

        <div className="grid-footer-left"></div>

        <div className="grid-footer-middle">
          <ButtonsFooterList />
        </div>

        <div className="grid-footer-right">
          <ButtonsFooterArticle
            selectedArticle={selectedArticle}
            setSelectedArticle={setSelectedArticle}
            currentArticle={currentArticle}
            setFullArticle={setFullArticle}
          />
        </div>
      </div>
    );
  }
};

export default Container;
