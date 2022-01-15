import React, { useState, useEffect } from "react";
import Article from "../Article";
let Parser = require("rss-parser");

function App() {
  let parser = new Parser();
  const [data, setData] = useState("");
  const [items, setItems] = useState("");
  const [rssInput, setRssInput] = useState("");
  const [rssFeeds, setRssFeeds] = useState([
    "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
    "https://www.theverge.com/rss/index.xml",
  ]);

  // const rssFeeds = ;

  let noFeeds = rssFeeds.length;

  console.log(noFeeds);

  useEffect(() => {
    for (let i = 0; i < noFeeds; i++) {
      async function myFetch() {
        return await parser.parseURL(rssFeeds[i]);
      }
      myFetch().then((data) => setData((prevState) => [data, ...prevState]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data !== "") {
      setItems((prevState) => [...data[0].items, ...prevState]);
      // items.sort(items.isoDate);
      // orderBy(items, "isoDate", "asc");
    }
  }, [data]);

  console.log(data);

  if (items === "") return <div>Loading</div>;

  return (
    <div className="background">
      <form>
        <input
          value={rssInput}
          type="string"
          name="rssFeedInput"
          placeholder="Enter feed url"
          onChange={(event) => setRssInput(event.target.value)}
        />
        <button>Add</button>
      </form>

      <div>
        {items.map((item, index) => (
          <Article data={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
