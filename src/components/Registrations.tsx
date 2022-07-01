import React, { useEffect, useState } from "react";
import { User } from "../types";
import { getEnvironmentFromEmail, copyTextToClipboard } from "../utils";
import Button from "./Button";
import NavigateTo from "./NavigateTo";

interface RegistrationsProps {
    user: User;
}

interface Registration {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export const Registrations = (props: RegistrationsProps) => {
    const { user } = props;
    const [registrations, setRegistrations] = useState<any>([]);

    const login = (reg: any) => {
      const environment = getEnvironmentFromEmail(reg.email);
      NavigateTo(`https://rih.${environment}.deadhappy.io/login`)
      setTimeout(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          console.log(tabs);
            chrome.tabs.sendMessage(
              // @ts-ignore
              tabs[0].id,
              {
                action: "login",
                reg: reg
              },
              (response) => {
                console.log("result message:", response);
              }
            );
        });
      }, 1500);
    }

    useEffect(() => {
        // Restores select box and checkbox state using the preferences
        // stored in chrome.storage.
        chrome.storage.sync.get('reg',
          (items) => {
              if (items) {
                console.log('found REG');
                console.log(items.reg);
                setRegistrations(items.reg);
              }
          }
        );
      }, []);

      const clearRegistrations = () => {
        chrome.storage.sync.remove('reg', () => {
          console.log('removed REG registrations');
        });
        setRegistrations([])
      };

      return (
        <>
        <h3 className="font-bold">Saved registrations</h3><p>These are saved registration details so you can 'confirm email' via the DB (dev only) and log back in later. For testing purposes only of course.</p><div className="container pb-4 py-2 grid grid-flow-row gap-4 w-full">
          <div className="w-full overflow-y-scroll h-48">
            <table className="relative table-auto w-full">
              <thead className="bg-white sticky top-0 text-left py-2 z-50 border-spacing-y-1 mb-2">
                <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Password</th>
                  <th>Environment</th>
                  <th className="text-center">Login</th>
                </tr>
              </thead>
              <tbody className="overflow-y-scroll">
                {registrations && registrations.map((reg: Registration) => (
                  <tr key={reg.email}>
                    <td onClick={() => copyTextToClipboard(reg.email)}>
                      <img src="/assets/copy-icon.svg" className="w-4 h-4 inline mr-1 hover:cursor-pointer" />
                      {reg.email}
                    </td>
                    <td>{reg.firstName}</td>
                    <td>{reg.lastName}</td>
                    <td>{reg.password}</td>
                    <td className="text-center">{getEnvironmentFromEmail(reg.email)}</td>
                    <td className="text-center"><Button text="Login" onClickHandler={() => login(reg)} className="py-0.5" /></td>
                  </tr>
                ))}
                {!registrations &&
                  <div className="text-black">Sorry, no registrations found.</div>}
              </tbody>
            </table>
          </div>
          <Button onClickHandler={clearRegistrations} text="Clear Registrations" key="clearReg" />
        </div>
        </> 
      )
}