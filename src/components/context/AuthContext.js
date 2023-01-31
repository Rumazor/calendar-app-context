import { createContext, useState, useMemo } from "react";

export const AuthContext = createContext(null);

const initialState = {
  checking: true,
  uid: null,
  name: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const authStateProvider = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  //ACTIONS

  //Start Login

  const value = {
    authStateProvider,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
