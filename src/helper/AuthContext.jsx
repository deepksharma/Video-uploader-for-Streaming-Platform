import React, { createContext, useContext, useState } from 'react';
import { getToken, removeToken, saveToken } from './local';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());

  const loginUser = (token) => {
    setToken(token);
    saveToken(token);
  };

  const logoutUser = () => {
    setToken(null);
    removeToken();
  };

  return (
    <AuthContext.Provider  value={{ token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);