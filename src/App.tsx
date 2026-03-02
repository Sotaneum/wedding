import { useState } from "react";
import "./App.css";
import rawSetting from "../setting.json";
import type { Setting } from "./types";
import Item from "./components/Item";

const setting = rawSetting as Setting;

function App() {
  const [isBannerLoaded, setIsBannerLoaded] = useState(false);

  return (
    <div>
      <Item id="banner" onLoaded={() => setIsBannerLoaded(true)} show />
      <div className="content-container">
        {Object.keys(setting)
          .filter((key) => !["banner", "title"].includes(key))
          .map((key) => (
            <Item key={key} id={key} show={isBannerLoaded} />
          ))}
      </div>
    </div>
  );
}

export default App;
