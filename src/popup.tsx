import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Content } from "./components/content";
import { Header } from "./components/header";
import "./styles/index.css";
import { User } from "./types";
import { getFullName, getEmail, getNameByIndex } from "./utils";


const Popup = () => {

  const [currentUser, setCurrentUser] = useState<User>({
    name: 'DeadHappy',
    email: 'test@deadhappy.com',
    firstName: 'Dead',
    lastName: 'Happy'
  });

  useEffect(() => {
    getUserInfo();
    console.log(currentUser);
  }, []);

  const getUserInfo = () => {  
    chrome.identity.getProfileUserInfo((userInfo) => {
      console.log(`userInfo: ${JSON.stringify(userInfo)}`);
      const { email } = userInfo;
      const userName = getFullName(email);
      let currentUserInfo = {
          name: userName,
          email: getEmail(userInfo),
          firstName: getNameByIndex(userName, 0),
          lastName: getNameByIndex(userName, 1),
      } 
      setCurrentUser(currentUserInfo);
    }); 
  }


  return (
    <div className="container w-[600px] h-auto mx-auto p-4">
      <Header user={currentUser} />
      <Content user={currentUser} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
