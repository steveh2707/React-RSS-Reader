import React, { useState, useEffect } from "react";
import Parser from "rss-parser";
import Container from "./Container";

function App() {
  let parser = new Parser();

  const CORS_PROXY = "https://young-cliffs-38123.herokuapp.com/";
  // const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  const [data, setData] = useState([]);
  const [rssInput, setRssInput] = useState("");
  const [rssFeeds, setRssFeeds] = useState([
    "fd",
    "dsgf",
    "x",
    "check",
    "fake",
    "https://www.theverge.com/rss/index.xml",
    "https://thewirecutter.com/feed/",
    "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
    "https://rss.art19.com/apology-line",
    "https://feeds.simplecast.com/54nAGcIl",
    "https://feeds.megaphone.fm/ADL9840290619",
    "https://www.eonline.com/syndication/feeds/rssfeeds/topstories.xml",
    // "http://www.tmz.com/rss",
    "test",
    "fake link",
    "frf",
  ]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function getRssFeed(feedName, dataStore, errorStore) {
      try {
        let feed = await parser.parseURL(CORS_PROXY + feedName);
        feed.items.forEach((item) => {
          item.read = false;
          item.feed = feed.title;
        });
        dataStore((prevState) => [...prevState, feed]);
        setLoading(false);
      } catch (e) {
        errorStore((prevState) => [...prevState, [feedName, e]]);
      }
    }

    // First run
    if (loading) {
      for (let i = 0; i < rssFeeds.length; i++) {
        getRssFeed(rssFeeds[i], setData, setErrors);
      }
    }

    // New RSS feed added
    else {
      getRssFeed(rssFeeds[rssFeeds.length - 1], setData, setErrors);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rssFeeds]);

  console.log(rssFeeds);

  // Set first article of first feed to read on load
  if (!loading) data[0].items[0].read = true;

  return (
    <div>
      {rssFeeds.length === 0 ? (
        <div>Add a feed</div>
      ) : (
        <Container
          data={data}
          feeds={rssFeeds}
          rssInput={rssInput}
          setRssInput={setRssInput}
          setRssFeeds={setRssFeeds}
          loading={loading}
          errors={errors}
        />
      )}
    </div>
  );
}

export default App;
