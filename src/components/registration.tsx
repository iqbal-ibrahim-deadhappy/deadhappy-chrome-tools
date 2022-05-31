import React, { useEffect, useState } from "react";
import { User } from "../types";

interface RegistrationProps {
  user: User;
}

export const Registration = (props: RegistrationProps) => {
  const { user } = props;
  //const { userEmail, firstName, lastName } = currentUserInfo;
  const [currentURL, setCurrentURL] = useState<string>();
  let allowActions;
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        setCurrentURL(tabs[0].url);
    });
    allowActions = currentURL && currentURL?.indexOf('deadhappy') > -1;
  }, [currentURL]);

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
    <button className={`bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-full ${allowActions ? '' : 'disabled'}`} onClick={() => autofillRegistration()}>Autofill Registration</button>
  );
};