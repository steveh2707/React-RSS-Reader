import React, { useState } from "react";
import ArticleList from "./ArticleList";
import Article from "./Article";
import FeedList from "./FeedList";
import { Alert } from "reactstrap";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Collapse,
} from "reactstrap";
import Loading from "./Loading";

const Container = (props) => {
  const { data } = props;
  const [selectedArticle, setSelectedArticle] = useState(0);
  const [selectedFeed, setSelectedFeed] = useState(0);
  const [modal, setModal] = useState(false);
  const [isOpenFeeds] = useState(true);
  // const [isOpenArticles] = useState(true);

  console.log(props.errors.length);

  const filteredData = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i] !== "RSS Feed not loaded") filteredData.push(data[i]);
  }

  // useEffect(() => {
  //   function handleResize() {
  //     console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
  //   }
  //   window.addEventListener("resize", handleResize);
  // });

  // console.log(filteredData);

  function loadFeedList() {
    if (props.loading) {
      return <Loading />;
    } else {
      return (
        <div>
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
          {props.errors.length === 0 ? null : (
            <Alert
              style={{
                textAlign: "center",
                fontSize: "12px",
                margin: "2px auto 2px auto",
                height: "35px",
                padding: "7px 20px 7px 20px",
              }}
              color="danger"
            >
              Unable to load {props.errors.length} feeds
            </Alert>
          )}
          <button
            className="FeedList"
            style={{ textAlign: "center" }}
            onClick={() => setModal(!modal)}
          >
            Add New Feed
          </button>
        </div>
      );
    }
  }

  function loadArticleList() {
    if (props.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          <br />
          <h3 style={{ fontVariant: "small-caps" }}>
            {props.data[selectedFeed].title}
          </h3>
          {filteredData[selectedFeed].items.map((item, index) => (
            <ArticleList
              allArticles={data}
              data={item}
              key={index}
              index={index}
              selectedArticle={selectedArticle}
              setSelectedArticle={setSelectedArticle}
            />
          ))}
        </div>
      );
    }
  }

  function loadArticle() {
    if (props.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          <Article data={filteredData[selectedFeed].items[selectedArticle]} />
        </div>
      );
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    props.setRssFeeds((prevState) => [...prevState, props.rssInput]);
    setModal(false);
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

          {loadFeedList()}

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

      <div className="columnArticleList">{loadArticleList()}</div>

      <div className="columnSpace"></div>

      <div className="columnArticle">{loadArticle()}</div>
    </div>
  );
};

export default Container;
