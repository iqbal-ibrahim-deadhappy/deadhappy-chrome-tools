import React, { useEffect, useState } from "react";
import { User } from "../types";
import NavigateTo from "./NavigateTo";

interface HeaderProps {
  user: User;
}

export const Header = (props: HeaderProps) => {
  const { user } = props;
  const [deathwishCounter, setDeathwishCounter] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(()=>{
    setInterval(()=>{
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
  }, []);

  fetch('https://rih.deadhappy.com/api/number')
  .then(response => response.json())
  .then(data => setDeathwishCounter(data.number));

  return (
    <>
      <div className="container grid grid-flow-col grid-cols-3 gap-4 items-center">
        <div className="text-left flex items-center">
          <img src="/assets/dhlogo.jpeg" style={{ maxWidth: "25px" }} />
          <div className="font-bold">Welcome, <span className="font-medium">{user.firstName} {user.lastName}</span></div>
        </div>
        <div className="text-right">
          {deathwishCounter && 
          (
            <span><span className="font-bold">Total Deathwishes: </span>{deathwishCounter}</span>
          )}
        </div>
        <div>
          <div className="text-right">{new Date().toLocaleDateString()}</div>
          <div className="text-right font-bold">{currentTime}</div>
        </div>
      </div>
      <div className="container grid grid-flow-col grid-cols-8 gap-4 py-3 items-center justify-center">
            <div className="text-left font-bold text-md">
              Quick Links
            </div>
            <div className="justify-center flex hover:cursor-pointer" onClick={() => NavigateTo('https://gitlab.com', true)}>
              <img src="/assets/gitlab.svg" className="h-5"/>
            </div>
            <div className="justify-center flex hover:cursor-pointer" onClick={() => NavigateTo('https://deadhappy.awsapps.com/start/#/', true)}>
              <img src="/assets/aws.png" className="h-6"/>
            </div>
            <div className="justify-center flex hover:cursor-pointer" onClick={() => NavigateTo('https://notion.so', true)}>
              <img src="/assets/notion.png" className="h-5"/>
            </div>
            <div className="justify-center flex hover:cursor-pointer" onClick={() => NavigateTo('https://stripe.com', true)}>
              <img src="/assets/stripe.png" className="h-6"/>
            </div>
            <div className="justify-center flex hover:cursor-pointer" onClick={() => NavigateTo('https://linear.app', true)}>
              <img src="/assets/linear.png" className="h-6"/>
            </div>
            <div className="justify-center flex hover:cursor-pointer" onClick={() => NavigateTo('https://miro.com', true)}>
              <img src="/assets/miro.png" className="h-6"/>
            </div>
            <div className="justify-center flex hover:cursor-pointer" onClick={() => NavigateTo('https://sentry.io/auth/login/deadhappy/', true)}>
              <img src="/assets/sentry.png" className="h-6"/>
            </div>
      </div>
    </>
  );
};