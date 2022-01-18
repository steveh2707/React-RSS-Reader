import React, { useState, useEffect } from "react";
import Parser from "rss-parser";
import Container from "./Container";
// import { Spinner } from "reactstrap";
// import Loading from "./Loading";
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
    "https://www.eonline.com/syndication/feeds/rssfeeds/topstories.xml",
    "http://www.tmz.com/rss",
    "test",
    "fake link",
  ]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   async function getRssFeed(props) {
  //     setLoading(true);
  //     try {
  //       const feed = [];
  //       for (let i = 0; i < props.length; i++) {
  //         feed[i] = await parser.parseURL(CORS_PROXY + props[i]).catch((e) => {
  //           setRssFeeds((prevState) => [...prevState].splice(0, i));
  //           window.alert("RSS Feed not found");
  //           return "RSS Feed not loaded";
  //         });
  //       }
  //       const filteredFeed = [];
  //       for (let i = 0; i < feed.length; i++) {
  //         if (typeof feed[i] === "object") filteredFeed.push(feed[i]);
  //       }
  //       for (let i = 0; i < filteredFeed.length; i++) {
  //         filteredFeed[i].items.forEach((item) => {
  //           item.read = false;
  //           item.feed = filteredFeed[i].title;
  //         });
  //       }
  //       setData(filteredFeed);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   getRssFeed(rssFeeds);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [rssFeeds]);

  useEffect(() => {
    async function getRssFeed(props) {
      setLoading(true);
      try {
        let feed = await parser.parseURL(CORS_PROXY + props).catch((e) => {
          // window.alert("RSS Feed not found");
        });

        if (typeof feed === "object") {
          for (let i = 0; i < data.length; i++) {
            if (feed.title === data[i].title) {
              return;
            }
          }
          setData((prevState) => [...prevState, feed]);
        } else {
          for (let i = 0; i < errors.length; i++) {
            if (props === errors[i]) {
              return;
            }
          }
          setErrors((prevState) => [...prevState, props]);
        }
      } finally {
        setLoading(false);
      }
    }

    for (let i = 0; i < rssFeeds.length; i++) {
      getRssFeed(rssFeeds[i]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rssFeeds]);

  // console.log(errors);

  // console.log(errors);

  // if (loading)
  //   return (
  //     // <      <div className="background">
  //     //         <div
  //     //           style={{
  //     //             position: "absolute",
  //     //             top: "40%",
  //     //             left: "50%",
  //     //           }}
  //     //         >
  //     //           <Spinner>Loading...</Spinner>
  //     //         </div>>
  //     //       </div>
  //     <Loading />
  //   );

  // Set first article of first feed to read on load
  // if (data[0] !== "RSS Feed not loaded") data[0].items[0].read = true;

  return (
    <div>
      <Container
        data={data}
        feeds={rssFeeds}
        rssInput={rssInput}
        setRssInput={setRssInput}
        setRssFeeds={setRssFeeds}
        loading={loading}
        errors={errors}
      />
      {/* <Test /> */}
    </div>
  );
}

export default App;
