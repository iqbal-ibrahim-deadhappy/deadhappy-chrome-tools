import React, { useEffect, useState } from "react";
import { User } from "../types";
import Button from "./Button";

interface StripeProps {
  user: User;
  currentURL?: string;
}

export const Stripe = (props: StripeProps) => {
  const { user, currentURL } = props;
  //const { userEmail, firstName, lastName } = currentUserInfo;

    const autofillStripe = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs);
          chrome.tabs.sendMessage(
            // @ts-ignore
            tabs[0].id,
            {
              action: "autofillStripe",
              user: user
            },
            (response) => {
              console.log("result message:", response);
            }
          );
      });
    }

  return (
    <Button text="Autofill Stripe" onClickHandler={autofillStripe} disabled={currentURL?.indexOf('checkout.stripe.com') == -1} />
  );
};