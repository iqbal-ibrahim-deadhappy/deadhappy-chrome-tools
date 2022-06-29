import React, { useEffect, useState } from "react";
import { User } from "../types";
import Button from "./Button";

interface GetInsuredProps {
  user: User;
}

export const GetInsured = (props: GetInsuredProps) => {
  const { user } = props;
  //const { userEmail, firstName, lastName } = currentUserInfo;

    const autofillGetInsured = (step: string) => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs);
          chrome.tabs.sendMessage(
            // @ts-ignore
            tabs[0].id,
            {
              action: `autofillGetInsured${step}`,
              user: user
            },
            (response) => {
              console.log("result message:", response);
            }
          );
      });
    }

  return (
    <>
      <Button text="Autofill GetInsured Step 1" onClickHandler={() => autofillGetInsured('Step1')} />
      <Button text="Autofill GetInsured Step 2" onClickHandler={() => autofillGetInsured('Step2')} />
    </>
  );
};