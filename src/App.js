import React, { useState, useEffect } from "react";
import Parser from "rss-parser";
import Container from "./Container";

function App() {
  let parser = new Parser();
  const CORS_PROXY = "https://young-cliffs-38123.herokuapp.com/";

  const [data, setData] = useState([]);
  const [rssInput, setRssInput] = useState("");
  const [rssFeeds, setRssFeeds] = useState([
    // "fd",
    // "dsgf",
    // "x",
    // "check",
    // "fake",
    "https://www.theverge.com/rss/index.xml",
    "https://thewirecutter.com/feed/",
    "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
    // "https://rss.art19.com/apology-line",
    // "https://feeds.simplecast.com/54nAGcIl",
    // "https://feeds.megaphone.fm/ADL9840290619",
    // "https://www.eonline.com/syndication/feeds/rssfeeds/topstories.xml",
    // "http://www.tmz.com/rss",
    // "test",
    // "fake link",
    // "frf",
  ]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    async function getRssFeed(feedName, errorStore, dataStore) {
      try {
        let feed = await parser.parseURL(CORS_PROXY + feedName);
        feed.items.forEach((item) => {
          item.read = false;
          item.feed = feed.title;
        });

        feed.items = feed.items.slice(0, 50);

        dataStore((prevState) =>
          [...prevState, feed].sort((a, b) =>
            a.title > b.title ? 1 : b.title > a.title ? -1 : 0
          )
        );

        // dataStore(
        //   (prevState) =>
        //     ([...prevState][0].items = [...prevState[0].items, ...feed.items])
        // );

        setAllItems((prevState) =>
          [...prevState, ...feed.items].sort((a, b) =>
            a.isoDate < b.isoDate ? 1 : b.isoDate < a.isoDate ? -1 : 0
          )
        );

        setLoading(false);
      } catch (e) {
        errorStore((prevState) => [...prevState, [feedName, e]]);
      }
    }

    // First run
    if (loading) {
      for (let i = 0; i < rssFeeds.length; i++) {
        getRssFeed(rssFeeds[i], setErrors, setData);
      }
    } // New RSS feed added
    else {
      getRssFeed(rssFeeds[rssFeeds.length], setErrors, setData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rssFeeds]);

  // console.log(data);

  // Set first article of first feed to read on load
  // if (!loading) allItems[0].read = true;

  return (
    <div className="full-page">
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
          allItems={allItems}
        />
      )}
    </div>
  );
}

export default App;
