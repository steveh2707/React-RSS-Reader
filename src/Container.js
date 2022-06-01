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
import MercuryParser from "./MercuryParser";

const Container = (props) => {
  const { data } = props;
  const [selectedArticle, setSelectedArticle] = useState(0);
  const [selectedFeed, setSelectedFeed] = useState(-1);
  const [modal, setModal] = useState(false);
  const [isOpenFeeds] = useState(true);
  const [alertOpen, setAlertOpen] = useState(true);
  const [fullArticle, setFullArticle] = useState(false);
  // const [isOpenArticles] = useState(true);

  // useEffect(() => {
  //   function handleResize() {
  //     console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
  //   }
  //   window.addEventListener("resize", handleResize);
  // });

  // console.log(data);
  // console.log(props.allItems);

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
          <br />
          {selectedFeed === -1 ? (
            <h3 style={{ fontVariant: "small-caps" }}>All Feeds</h3>
          ) : (
            <h3 style={{ fontVariant: "small-caps" }}>
              {props.data[selectedFeed].title}
            </h3>
          )}

          {selectedFeed === -1
            ? props.allItems.map((item, index) => (
                <ArticleList
                  allArticles={data}
                  data={item}
                  key={index}
                  index={index}
                  selectedArticle={selectedArticle}
                  setSelectedArticle={setSelectedArticle}
                  setFullArticle={setFullArticle}
                />
              ))
            : data[selectedFeed].items.map((item, index) => (
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
          {
            selectedFeed === -1 ? (
              fullArticle ? (
                <MercuryParser data={props.allItems[selectedArticle]} />
              ) : (
                <Article data={props.allItems[selectedArticle]} />
              )
            ) : fullArticle ? (
              <MercuryParser data={data[selectedFeed].items[selectedArticle]} />
            ) : (
              <Article data={data[selectedFeed].items[selectedArticle]} />
            )
            // <Article data={props.allItems[selectedArticle]} />
            // <MercuryParser data={props.allItems[selectedArticle]} />
            // <Article data={data[selectedFeed].items[selectedArticle]} />
          }
          {/* <Article data={data[selectedFeed].items[selectedArticle]} /> */}
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

      <div className="columnArticleList">{loadArticleList()}</div>

      <div className="columnSpace"></div>

      <div className="columnArticle">{loadArticle()}</div>
    </div>
  );
};

export default Container;
