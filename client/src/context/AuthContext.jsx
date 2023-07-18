import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";
import Cookies from "js-cookie";

export const Authcontext = createContext();

export const useAuth = () => {
  const context = useContext(Authcontext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      const response = await registerRequest(user);
      console.log(`The response data is: \n${response.data}`);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
      setUser(null);
    }
  };

  const signin = async (user) => {
    try {
      const response = await loginRequest(user);
      console.log(response.data);
      setIsAuthenticated(true);
      setUser(response.data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      Array.isArray(error.response.data)
        ? setErrors(error.response.data)
        : setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // consulta hacia el backend, comprobacion de cookie
  useEffect(() => {
    const cookies = Cookies.get();
    console.log(cookies);
    if (cookies.token) console.log(cookies.token);
  }, []);

  return (
    <Authcontext.Provider value={{ signup, signin, user, isAuthenticated, errors }}>
      {children}
    </Authcontext.Provider>
  );
};
