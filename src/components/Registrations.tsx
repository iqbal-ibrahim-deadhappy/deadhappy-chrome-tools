import React, { useEffect, useState } from "react";
import { User } from "../types";
import Button from "./Button";

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


    useEffect(() => {
        // Restores select box and checkbox state using the preferences
        // stored in chrome.storage.
        chrome.storage.sync.get('reg',
          (items) => {
              if (items) {
                console.log(JSON.stringify(items.reg));
                setRegistrations(items.reg);
              }
          }
        );
      }, []);

      const clearRegistrations = () => {
        chrome.storage.sync.remove('reg', () => {
          console.log('removed REG registrations');
        });
        chrome.storage.sync.remove('key', () => {
          console.log('removed KEY registrations');
        });
      };

      return (
        <div className="container pb-4 py-2 grid grid-flow-row gap-4 w-full">
          <table className="table-auto">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
            {registrations && registrations.map((reg: Registration) => (
              <tr key={reg.id}>
                <td>{reg.email}</td>
                <td>{reg.firstName}</td>
                <td>{reg.lastName}</td>
                <td>{reg.password}</td>
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