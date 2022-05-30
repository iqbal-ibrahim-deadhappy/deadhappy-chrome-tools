import { screen, fireEvent, waitFor } from "@testing-library/react";
import { User } from "./types";

const selectors = {
  mortgageCard: () => screen.getByTestId("pay-off-the-mortgage-card"),
  deathwishAmountSelect: () => screen.getByTestId("amount-select"),
  deathwishSubmitButton: () => screen.getByTestId("submit-button"),
  email: () => screen.getByLabelText("email-input"),
  emailError: () => screen.queryByLabelText("email-error"),
  firstName: () => screen.getByLabelText("firstName-input"),
  lastName: () => screen.getByLabelText("lastName-input"),
  firstNameErrorByQuery: () => screen.queryByLabelText("firstName-error"),
  firstNameErrorByLabelText: () => screen.getByLabelText("firstName-error"),
  lastNameErrorByQuery: () => screen.queryByLabelText("lastName-error"),
  lastNameErrorByLabelText: () => screen.getByLabelText("lastName-error"),
  password: () => screen.getByLabelText("password-input"),
  passwordError: () => screen.getByLabelText("password-error"),
  passwordConf: () => screen.getByLabelText("passwordConfirmation-input"),
  passwordConfError: () => screen.getByLabelText("passwordConfirmation-error"),
  createAccount: () => screen.queryByRole("button", { name: "Create account" }),
  dateOfBirth: () => screen.getByTestId("dob-input"),
  getInsuredButton: () => screen.getByTestId('getInsured-button'),
  isSmoker: () => screen.getByText("Have you smoked in the last 12 months?")
};

/*
 * Generates email address in format
 * firstname.lastname+YYYY-DD-MM-hh-mm@deadhappy.com
 */
const generateEmailAddress = (email: string) => {
  if (!email || email.indexOf('@') == -1) return `test+${getDateTimestamp()}@deadhappy.com`;
  let environment = window.location.href.indexOf('.dev.') > -1 ? 'dev' : 'stg';
  let userName = email.split("@")[0];
  let userDomain = email.split("@")[1];
  return `${userName}+${environment}-${getDateTimestamp()}@${userDomain}`
}

/*
 * Returns date in format YYYY-MM-DD
 */
const getDateTimestamp = () => {
  let current = new Date().toISOString();
  let date = current.split('T')[0];
  let timestamp = current.split('T')[1].split(":").join("-").split(".")[0]
  return `${date}-${timestamp}`
}

chrome.runtime.onMessage.addListener(async function (msg, sender, sendResponse) {
  const { action } = msg;

  if (!action) {
    console.log('No action provided');
    sendResponse("No action provided");
  }

  console.log("Received action: ", action);
  console.log("Sender: ", sender)

  if (action == "autofillRegistration") {
  const { email, firstName, lastName } = msg.user;

    fireEvent.change(selectors.email(), { target: { value: generateEmailAddress(email) } });
    fireEvent.change(selectors.firstName(), { target: { value: firstName } });
    fireEvent.change(selectors.lastName(), { target: { value: lastName } });
    fireEvent.change(selectors.password(), { target: { value: "password" } });
    fireEvent.change(selectors.passwordConf(), {
      target: { value: "password" },
    });

    await fireEvent.click(selectors.createAccount() as Element);

    await waitFor(() =>
      expect(window.location.href).toEqual(
        "http://rih.testing.deadhappy.io/setup-steps/get-insured"
      )
    );
  }

  if (action == "autofillGetInsured") {
    fireEvent.change(selectors.dateOfBirth(), { target: { value: '20/10/2000' } });
    fireEvent.change(selectors.isSmoker(), { target: { value: 'No' } });
    await fireEvent.click(selectors.getInsuredButton() as Element);
  }

  if (action == "autofillDeathwish") {
    fireEvent.click(selectors.mortgageCard() as Element);
    
    await waitFor(() => {
      fireEvent.change(selectors.deathwishAmountSelect(), {
        target: { value: 5000 },
      });
      fireEvent.click(selectors.deathwishSubmitButton());
    });
  }
  
  sendResponse("Completed action " + action);
});
