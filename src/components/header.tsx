import React, { useEffect, useState } from "react";
import { User } from "../types";

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
    </>
  );
};