import React, { useState } from "react";
import { AUTH_TOKEN } from "../constants";
const { createContext } = require("react");

function getAuthTokenFromLocalStorage() {
  return localStorage.getItem(AUTH_TOKEN)
    ? localStorage.getItem(AUTH_TOKEN)
    : null;
}
const UserContext = createContext();

function UserProvider({ children }) {
  const [authToken, setAuthToken] = useState(getAuthTokenFromLocalStorage());

  const loginUser = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
    setAuthToken(token);
  };

  const logoutUser = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setAuthToken(null);
  };
  return (
    <UserContext.Provider
      value={{ authToken, setAuthToken, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
