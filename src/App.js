import React, { useState, useEffect } from "react";
import Parser from "rss-parser";
import Container from "./Container";
// import Test from "./Test";

function App() {
  let parser = new Parser();
  const [data, setData] = useState([{}]);
  // const [rssInput, setRssInput] = useState("");
  const [rssFeeds] = useState([
    "https://www.theverge.com/rss/index.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
    "https://rss.art19.com/apology-line",
    "https://feeds.simplecast.com/54nAGcIl",
    "https://feeds.megaphone.fm/ADL9840290619",
  ]);
  const [loading, setLoading] = useState(true);

  async function getRssFeed(props) {
    try {
      setLoading(true);
      const feed = [];
      for (let i = 0; i < props.length; i++) {
        feed[i] = await parser.parseURL(props[i]);
      }
      setData(feed);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRssFeed(rssFeeds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);

  // function onSubmit(e) {
  //   e.preventDefault();
  //   setRssFeeds((prevState) => [...prevState, rssInput]);
  // }

  if (loading) return <div className="background">Loading</div>;

  return (
    <div>
      {/* <form onSubmit={onSubmit}>
        <input
          value={rssInput}
          type="string"
          name="rssFeedInput"
          placeholder="Enter feed url"
          onChange={(event) => setRssInput(event.target.value)}
        />
        <button>Add</button>
      </form> */}
      <Container data={data} feeds={rssFeeds} />
      {/* <Test /> */}
    </div>
  );
}

export default App;
