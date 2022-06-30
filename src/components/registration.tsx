import React, { useEffect, useState } from "react";
import { User } from "../types";
import Button from "./Button";

interface RegistrationProps {
  user: User;
}

export const Registration = (props: RegistrationProps) => {
  const { user } = props;
  //const { userEmail, firstName, lastName } = currentUserInfo;
  const [currentURL, setCurrentURL] = useState<string>('');
  
  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      // read changeInfo data and do something with it
      // like send the new url to contentscripts.js
      if (changeInfo.url) {
        setCurrentURL(changeInfo.url);
      }
    }
  );

    const autofillRegistration = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs);
          chrome.tabs.sendMessage(
            // @ts-ignore
            tabs[0].id,
            {
              action: "autofillRegistration",
              user: user
            },
            (response) => {
              console.log("result message:", response);
            }
          );
      });
    }

  return (
    <Button text="Autofill Registration" onClickHandler={autofillRegistration} disabled={currentURL?.indexOf('/account/create') == -1}/>
  );
};