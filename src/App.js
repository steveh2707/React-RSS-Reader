import React, { useState, useEffect } from "react";
import Parser from "rss-parser";
import Container from "./Container";
import Test from "./Test";

function App() {
  let parser = new Parser();
  const [data, setData] = useState({});
  // const [rssInput, setRssInput] = useState("");
  const [rssFeeds] = useState([
    "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
    "https://www.theverge.com/rss/index.xml",
  ]);
  const [loading, setLoading] = useState(true);

  async function getRssFeed() {
    try {
      setLoading(true);
      const feed = await parser.parseURL(rssFeeds[1]);
      setData(feed);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRssFeed();
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
      <Container data={data} />
      {/* <Test /> */}
    </div>
  );
}

export default App;
