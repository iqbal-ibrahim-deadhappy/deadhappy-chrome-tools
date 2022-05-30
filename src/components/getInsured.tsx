import React, { useEffect, useState } from "react";
import { User } from "../types";

interface GetInsuredProps {
  user: User;
}

export const GetInsured = (props: GetInsuredProps) => {
  const { user } = props;
  //const { userEmail, firstName, lastName } = currentUserInfo;

    const autofillGetInsured = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs);
          chrome.tabs.sendMessage(
            // @ts-ignore
            tabs[0].id,
            {
              action: "autofillGetInsured",
              user: user
            },
            (response) => {
              console.log("result message:", response);
            }
          );
      });
    }

  return (
    <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-full" onClick={() => autofillGetInsured()}>Autofill GetInsured</button>
  );
};