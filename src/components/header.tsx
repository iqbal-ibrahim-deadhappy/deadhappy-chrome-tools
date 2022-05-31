import React, { useEffect, useState } from "react";
import { User } from "../types";

interface HeaderProps {
  user: User;
}

export const Header = (props: HeaderProps) => {
  const { user } = props;
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(()=>{
    setInterval(()=>{
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
  }, []);

  return (
    <>
      <div className="container grid grid-flow-col grid-cols-3 gap-4 items-center">
        <div className="">
          <img src="https://deadhappy.com/wp-content/uploads/2021/03/DeadHappy-600-.jpg" style={{ maxWidth: "50px" }} />
        </div>
        <div className="">
          <div className="font-bold">Welcome, <span className="font-medium">{user.firstName} {user.lastName}</span></div>
        </div>
        <div className="text-right">
          <div className="text-right font-bold">{currentTime}</div>
          <div className="text-right font-bold">{new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </>
  );
};