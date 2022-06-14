import React from "react";
import FeedListItem from "./FeedListItem";
import { Alert } from "reactstrap";
import Loading from "./Loading";

function FeedList(props) {
  if (props.loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <FeedListItem
          data={{ title: "All Feeds", items: props.allItems }}
          index={-1}
          selectedFeed={props.selectedFeed}
          setSelectedFeed={props.setSelectedFeed}
          setSelectedArticle={props.setSelectedArticle}
          setFullArticle={props.setFullArticle}
        />
        <br />
        {props.data.map((item, index) => (
          <FeedListItem
            data={item}
            key={index}
            index={index}
            selectedFeed={props.selectedFeed}
            setSelectedFeed={props.setSelectedFeed}
            setSelectedArticle={props.setSelectedArticle}
            setFullArticle={props.setFullArticle}
          />
        ))}
        {props.errors.length === 0 ? null : (
          <Alert
            isOpen={props.alertOpen}
            toggle={() => props.setAlertOpen(false)}
            style={{
              textAlign: "center",
              fontSize: "12px",
              margin: "2px auto 2px auto",
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

export default FeedList;
