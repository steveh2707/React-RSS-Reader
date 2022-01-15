import React, { useState } from "react";
import ArticleList from "./ArticleList";
import Article from "./Article";
import FeedList from "./FeedList";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Collapse,
} from "reactstrap";

const Container = (props) => {
  const { data } = props;
  const [selectedArticle, setSelectedArticle] = useState(0);
  const [selectedFeed, setSelectedFeed] = useState(0);
  const [modal, setModal] = useState(false);
  const [isOpenFeeds] = useState(true);
  // const [isOpenArticles] = useState(true);

  const filteredData = [];

  // useEffect(() => {
  //   function handleResize() {
  //     console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
  //   }
  //   window.addEventListener("resize", handleResize);
  // });

  for (let i = 0; i < data.length; i++) {
    if (data[i] !== "RSS Feed not loaded") filteredData.push(data[i]);
  }

  console.log(filteredData);

  function onSubmit(e) {
    e.preventDefault();
    props.setRssFeeds((prevState) => [...prevState, props.rssInput]);
  }

  return (
    <div className="background">
      <Collapse isOpen={isOpenFeeds}>
        <div className="columnNav">
          <br />
          <h2
            style={{
              textAlign: "center",
              marginBottom: "15px",
              fontVariant: "small-caps",
            }}
          >
            Feeds
          </h2>
          {filteredData.map((item, index) => (
            <FeedList
              data={item}
              key={index}
              index={index}
              selectedFeed={selectedFeed}
              setSelectedFeed={setSelectedFeed}
              setSelectedArticle={setSelectedArticle}
            />
          ))}

          <button
            className="FeedList"
            style={{ textAlign: "center" }}
            onClick={() => setModal(!modal)}
          >
            Add New Feed
          </button>

          <Modal isOpen={modal} toggle={() => setModal(!modal)}>
            <ModalHeader toggle={() => setModal(!modal)}>
              Input RSS Feed
            </ModalHeader>
            <form onSubmit={onSubmit}>
              <ModalBody>
                <input
                  style={{ width: "450px" }}
                  value={props.rssInput}
                  type="string"
                  name="rssFeedInput"
                  placeholder="Enter feed url"
                  onChange={(event) => props.setRssInput(event.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary">Add</Button>
              </ModalFooter>
            </form>
          </Modal>
        </div>
        <div className="columnSpace"></div>
      </Collapse>

      {/* <Collapse isOpen={isOpenArticles}> */}
      <div className="columnArticleList">
        <br />
        <h3 style={{ fontVariant: "small-caps" }}>
          {props.data[selectedFeed].title}
        </h3>
        {data.length !== 0 ? (
          filteredData[selectedFeed].items.map((item, index) => (
            <ArticleList
              allArticles={data}
              data={item}
              key={index}
              index={index}
              selectedArticle={selectedArticle}
              setSelectedArticle={setSelectedArticle}
            />
          ))
        ) : (
          <div className="articleList">RSS Feed will be shown here</div>
        )}
      </div>
      <div className="columnSpace"></div>
      {/* </Collapse> */}

      <div className="columnArticle">
        {data.length !== 0 ? (
          <Article data={filteredData[selectedFeed].items[selectedArticle]} />
        ) : (
          <div className="article">Article will be shown here</div>
        )}
      </div>
    </div>
  );
};

export default Container;
