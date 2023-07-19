import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
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
  const [loading, setLoading] = useState(true);

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
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await verifyTokenRequest(cookies.token);
        console.log(response);
        if (!response.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        // setUser(response.data);
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.log("Error verifying token: ", error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <Authcontext.Provider value={{ signup, signin, user, isAuthenticated, errors, loading }}>
      {children}
    </Authcontext.Provider>
  );
};
