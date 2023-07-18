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
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <Authcontext.Provider
      value={{ signup, signin, user, isAuthenticated, loading, errors }}
    >
      {children}
    </Authcontext.Provider>
  );
};
