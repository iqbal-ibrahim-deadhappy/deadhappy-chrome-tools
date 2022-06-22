import React, { useEffect, useState } from "react";
import { User } from "../types";
import { getEnvironmentFromEmail } from "../utils";
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
      };

      return (
        <div className="container pb-4 py-2 grid grid-flow-row gap-4 w-full">
          <table className="table-auto">
            <thead className="text-left">
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Password</th>
                <th>Environment</th>
                <th className="text-center">Login</th>
              </tr>
            </thead>
            <tbody className="table-fixed items-center justify-between overflow-y-scroll h-48">
              {registrations && registrations.map((reg: Registration) => (
                <tr key={reg.id}>
                  <td>{reg.email}</td>
                  <td>{reg.firstName}</td>
                  <td>{reg.lastName}</td>
                  <td>{reg.password}</td>
                  <td className="text-center">{getEnvironmentFromEmail(reg.email)}</td>
                  <td className="text-center"><Button text="Login" onClickHandler={() => login(reg)} /></td>
                </tr>
              ))}
              {!registrations &&
                <div className="text-black">Sorry, no registrations found.</div>
              }
            </tbody>
            </table>
            <Button onClickHandler={clearRegistrations} text="Clear Registrations" key="clearReg" />
        </div> 
      )
}