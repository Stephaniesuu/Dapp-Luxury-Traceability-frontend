import React, { createContext, useState, useContext } from 'react';
import {number} from "react-table/src/sortTypes";

const UserContext = createContext(null);
export const UserProvider = ({ children }) => {

  // get info of user from localStorage if it exists
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [usernum, setUsernum] = useState("");
  const [username, setUsername] = useState("");
  // login function for setting user info
  const login = (userData) => {
    setUser(userData);
    setRole(userData.role);
    setAddress(userData.address);
    setUsernum(userData.usernum)
    setUsername(userData.username);

  };
  // provide the user object and login function through the context
  return (
    <UserContext.Provider value={{ setUser, login, user, role, address, usernum, username }}>
      {children}
    </UserContext.Provider>
  );
  
};

// hook for using the context
export const useUser = () => {
  return useContext(UserContext);
};

export default UserContext;
