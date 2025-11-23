import { createContext, useContext } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const storeTokenInLocalStorage = (token) => {
    return localStorage.setItem("token", token);
  }
  return <AuthContext.Provider value={storeTokenInLocalStorage}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}