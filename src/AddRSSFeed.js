import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  // Collapse,
} from "reactstrap";

function AddRSSFeed(props) {
  const [modal, setModal] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    props.setRssFeeds((prevState) => [...prevState, props.rssInput]);
    setModal(false);
  }

  return (
    <div>
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
  );
}

export default AddRSSFeed;
