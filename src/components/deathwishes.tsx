import React, { useEffect, useState } from "react";
import { User } from "../types";
import Button from "./Button";

interface DeathwishProps {
  user: User;
  currentURL?: string;
}

export const Deathwish = (props: DeathwishProps) => {
  const { user, currentURL } = props;

    const autofillDeathwish = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs);
          chrome.tabs.sendMessage(
            // @ts-ignore
            tabs[0].id,
            {
              action: "autofillDeathwish",
              user: user
            },
            (response) => {
              console.log("result message:", response);
            }
          );
      });
    }

  return (
      <Button text="Autofill Deathwish" onClickHandler={autofillDeathwish} disabled={currentURL?.indexOf('deathwish') == -1 || currentURL?.indexOf('store') == -1} />
  );
};