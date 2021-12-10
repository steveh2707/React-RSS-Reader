import React, { useState, useEffect } from "react";
import Parser from "rss-parser";
import Container from "./Container";
// import Test from "./Test";

function App() {
  let parser = new Parser();

  const CORS_PROXY = "https://young-cliffs-38123.herokuapp.com/";
  // const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  const [data, setData] = useState([]);
  const [rssInput, setRssInput] = useState("");
  const [rssFeeds, setRssFeeds] = useState([
    "https://www.theverge.com/rss/index.xml",
    "https://thewirecutter.com/feed/",
    "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
    "https://rss.art19.com/apology-line",
    "https://feeds.simplecast.com/54nAGcIl",
    "https://feeds.megaphone.fm/ADL9840290619",
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRssFeed(props) {
      setLoading(true);
      try {
        const feed = [];
        for (let i = 0; i < props.length; i++) {
          feed[i] = await parser.parseURL(CORS_PROXY + props[i]).catch((e) => {
            setRssFeeds((prevState) => [...prevState].splice(0, i));
            window.alert("RSS Feed not found");
            return "RSS Feed not loaded";
          });
        }
        const filteredFeed = [];
        for (let i = 0; i < feed.length; i++) {
          if (typeof feed[i] === "object") filteredFeed.push(feed[i]);
        }
        for (let i = 0; i < filteredFeed.length; i++) {
          filteredFeed[i].items.map((item) => (item.read = false));
        }
        setData(filteredFeed);
      } finally {
        setLoading(false);
      }
    }
    getRssFeed(rssFeeds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rssFeeds]);

  console.log(data);

  if (loading) return <div className="background">Loading</div>;

  return (
    <div>
      <Container
        data={data}
        feeds={rssFeeds}
        rssInput={rssInput}
        setRssInput={setRssInput}
        setRssFeeds={setRssFeeds}
      />
      {/* <Test /> */}
    </div>
  );
}

export default App;
