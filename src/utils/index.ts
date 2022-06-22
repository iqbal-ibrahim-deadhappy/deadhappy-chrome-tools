export const getFullName = (email: string) => {
  if (!email) return 'Dead Happy';
  return email.split("@")[0].split('.').join(' ');
}
  
export const getEmail = (userInfo: any) => {
  if (!userInfo.email) return 'test@deadhappy.com';
  return userInfo.email;
}

export const capitalizeWord = (word: string) => {
  return `${word.charAt(0).toUpperCase()}${word.substring(1)}`;
}

export const getNameByIndex = (name: string, index: number) => {
  return capitalizeWord(name.split(" ")[index]);
}

export const getEnvironmentFromEmail = (email: string) => {
  if (!email) return 'dev';
  return email.split("+")[1].split("-")[0];
}