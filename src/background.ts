// const getFullName = (email: string) => {
//     console.log(`Email: ${email}`);
//     if (!email) return 'Dead Happy';
//     return email.split("@")[0].split('.').join(' ');
// }

// const getEmail = (userInfo: any) => {
//     if (!userInfo.email) return 'test@deadhappy.com';
//     return userInfo.email;
// }
  
// chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){
//     console.log(`background: received ${JSON.stringify(message)} from ${sender}`);

//     if(message.action == "getUserInfo"){
//         console.log(`getUserInfo`);
//         chrome.identity.getProfileUserInfo(function(userInfo) {
//             console.log(userInfo);
//             const userName = getFullName(userInfo.email);
        
//             let currentUser = {
//                 name: userName,
//                 email: getEmail(userInfo),
//                 firstName: userName.split(" ")[0],
//                 lastName: userName.split(" ")[1]
//             }
        
//             console.log(`background script: Got user ${currentUser.firstName} ${currentUser.lastName}`);
//             senderResponse(currentUser);
//         }); 
//     }
//   });