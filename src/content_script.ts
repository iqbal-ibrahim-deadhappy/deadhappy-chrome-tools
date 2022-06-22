import { screen, fireEvent, waitFor } from "@testing-library/react";
import { User } from "./types";

const selectors = {
  deathwish: {
    mortgageCard: () => screen.getByTestId("pay-off-the-mortgage-card"),
    deathwishAmountSelect: () => screen.getByTestId("amount-select"),
    deathwishSubmitButton: () => screen.getByTestId("submit-button"),
  },
  registration: {
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
  },
  getInsured: {
    dateOfBirth: () => screen.getByTestId("dob-input"),
    getInsuredButton: () => screen.getByTestId('getInsured-button'),
    isSmoker: () => screen.getByRole('radio', { name: "is_smoker" }),
  },
  stripe: {
    cardNumber: () => screen.getByLabelText('Card number'),
    expiry: () => screen.getByLabelText('Expiry'),
    cvc: () => screen.getByPlaceholderText('CVC'),
    name: () => screen.getByRole("text", { name: 'billingName'}),
    addressLine1: () => screen.getByLabelText('Address'),
    city: () => screen.getByLabelText('Town or city'),
    postcode: () => screen.getByLabelText('Postal code'),
    subscribe: () => screen.getByTestId('hosted-payment-submit-button')
  },
  login: {
    email: () => screen.getByRole("textbox", { name: 'Email'}),
    password: () => screen.getByLabelText(/Password/i),
    submit: () => screen.getByText("Sign In")
  }
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
    const newEmail = generateEmailAddress(email) 
    const newUser = {
      email: newEmail,
      firstName,
      lastName,
      password: 'password'
    }

    fireEvent.change(selectors.registration.email(), { target: { value: newEmail} });
    fireEvent.change(selectors.registration.firstName(), { target: { value: firstName } });
    fireEvent.change(selectors.registration.lastName(), { target: { value: lastName } });
    fireEvent.change(selectors.registration.password(), { target: { value: "password" } });
    fireEvent.change(selectors.registration.passwordConf(), {
      target: { value: "password" },
    });

    chrome.storage.sync.get({ reg: [] },
      (items) => {
        console.log('1 - get REG');
          if (items.reg) {
            console.log('2a - found REG');
            console.log(JSON.stringify(items.reg));
            chrome.storage.sync.set({reg: [...items.reg, newUser]}, function() {
              console.log('3a - setting REG');
              console.log('Value is set to ' + newUser);
            });
          } else {
            console.log('2b - not found REG');
            chrome.storage.sync.set({reg: [ newUser ]}, function() {
              console.log('3b - setting REG');
              console.log('Value is set to ' + newUser);
            });
          }
      }
    );

    await fireEvent.click(selectors.registration.createAccount() as Element);

    await waitFor(() =>
      expect(window.location.href).toEqual(
        "http://rih.testing.deadhappy.io/setup-steps/get-insured"
      )
    );
  }

  if (action == "autofillGetInsured") {
    fireEvent.change(selectors.getInsured.dateOfBirth(), { target: { value: '20/10/2000' } });
    fireEvent.click(selectors.getInsured.isSmoker(), { target: { checked: true }});
    await fireEvent.click(selectors.getInsured.getInsuredButton() as Element);
  }

  if (action == "autofillDeathwish") {
    fireEvent.click(selectors.deathwish.mortgageCard() as Element);
    
    await waitFor(() => {
      fireEvent.change(selectors.deathwish.deathwishAmountSelect(), {
        target: { value: 5000 },
      });
      fireEvent.click(selectors.deathwish.deathwishSubmitButton());
    });
  }

  if (action == "autofillStripe") {
    console.log('autofilling Stripe...');
    fireEvent.change(selectors.stripe.cardNumber(), { target: { value: '4242424242424242' } });
    fireEvent.change(selectors.stripe.expiry(), { target: { value: '0125' } });
    fireEvent.change(selectors.stripe.cvc(), { target: { value: '123' } });
    fireEvent.change(selectors.stripe.name(), { target: { value: 'DeadHappy' } });
    fireEvent.change(selectors.stripe.addressLine1(), { target: { value: '1 Mansfield Street' } });
    fireEvent.change(selectors.stripe.city(), { target: { value: 'Leicester' } });
    fireEvent.change(selectors.stripe.postcode(), { target: { value: 'LE1 1DH' } });
    //await fireEvent.click(selectors.stripe.subscribe() as Element);
    // await waitFor(() =>
    //   expect(window.location.href).toEqual(
    //     "https://products.dev.deadhappy.io/payment/success"
    //   )
    // );
  }

  if (action == "login") {
    const { reg } = msg;
    console.log(selectors.login.email())
    fireEvent.change(selectors.login.email(), { target: { value: reg.email } });
    fireEvent.change(selectors.login.password(), { target: { value: reg.password } });
    fireEvent.click(selectors.login.submit() as Element);
  }
  
  sendResponse("Completed action " + action);
});
