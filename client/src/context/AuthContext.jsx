import { createContext, useState, useContext } from "react";
import { registerRequest } from "../api/auth";

export const Authcontext = createContext();

export const useAuth = () => {
  const context = useContext(Authcontext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signup = async (user) => {
    try {
      const response = await registerRequest(user);
      console.log(`The response data is: \n${response.data}`);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  return (
    <Authcontext.Provider value={{ signup, user, isAuthenticated }}>
      {children}
    </Authcontext.Provider>
  );
};
