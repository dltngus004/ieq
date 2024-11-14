import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [serialNumber, setSerialNumber] = useState('');
  const [devices, setDevices] = useState([]);
  const [email, setEmail] = useState('');

  // UserContext 일괄 업데이트 함수
  const updateUserContext = ({ userName, nickname, profileImage, serialNumber, devices, email }) => {
    if (userName !== undefined) setUserName(userName);
    if (nickname !== undefined) setNickname(nickname);
    if (profileImage !== undefined) setProfileImage(profileImage);
    if (serialNumber !== undefined) setSerialNumber(serialNumber);
    if (devices !== undefined) setDevices(devices);
    if (email !== undefined) setEmail(email);
  };

  // UserContext 초기화 함수
  const resetUserContext = () => {
    setUserName('');
    setNickname('');
    setProfileImage(null);
    setSerialNumber('');
    setDevices([]);
    setEmail('');
  };

  return (
    <UserContext.Provider value={{ 
      userName, setUserName, 
      nickname, setNickname, 
      serialNumber, setSerialNumber, 
      devices, setDevices, 
      email, setEmail, 
      resetUserContext,
      updateUserContext // updateUserContext 함수 추가
    }}>
      {children}
    </UserContext.Provider>
  );
};
