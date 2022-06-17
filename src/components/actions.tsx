import React, { useEffect, useState } from "react";
import { User } from "../types";
import { Deathwish } from "./deathwishes";
import { GetInsured } from "./getInsured";
import { Registration } from "./registration";

interface ActionsProps {
  user: User;
}

export const Actions = (props: ActionsProps) => {
  const { user } = props;
  const [currentURL, setCurrentURL] = useState<string>();

  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      // read changeInfo data and do something with it
      // like send the new url to contentscripts.js
      if (changeInfo.url) {
        setCurrentURL(changeInfo.url);
      }
    }
  );

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);
  return (
    <>
      <div className="py-2 pt-4 font-bold col-span-full truncate">Current URL: <span className="font-medium">{currentURL}</span></div>
      <div className="container pb-4 py-2 grid grid-flow-row grid-cols-3 gap-4 w-full">
        <Deathwish user={user} />
        <Registration user={user} />
        <GetInsured user={user} />
      </div>
    </>
  );
};