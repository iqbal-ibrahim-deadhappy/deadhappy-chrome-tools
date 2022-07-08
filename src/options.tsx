import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "./components/Button";

const Options = () => {
  const [gpat, setGpat] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.sync.get(
      {
        gitlabToken: '',
      },
      (items) => {
        setGpat(items.gitlabToken);
      }
    );
  }, []);

  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      {
        gitlabToken: gpat,
      },
      function() {
        // Update status to let user know options were saved.
        setStatus("Options saved.");
        const id = setTimeout(() => {
          setStatus("");
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  return (
    <>
      <div>
        Gitlab Personal Access Token: <input
          type="text"
          value={gpat}
          onChange={(event) => {
            console.log(event.target.value)
            setGpat(event.target.value)
          }}
        >
        </input>
      </div>
      <div>{status}</div>
      <Button 
        onClickHandler={() => saveOptions()}
        text="SAVE"
      />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
