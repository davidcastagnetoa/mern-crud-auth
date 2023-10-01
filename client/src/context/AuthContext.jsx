import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";

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

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Crear usuario
  const signup = async (user) => {
    try {
      const response = await registerRequest(user);
      console.log(`The response data is: \n${response}`);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
      setUser(null);
    }
  };

  // Logarse
  const signin = async (user) => {
    try {
      const response = await loginRequest(user);
      console.log(response.data);
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      Array.isArray(error.response.data)
        ? setErrors(error.response.data)
        : setErrors([error.response.data.message]);
    }
  };

  // Deslogarse
  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // consulta hacia el backend, comprobacion de cookie
  useEffect(() => {
    async function checkLogin() {
      try {
        const response = await verifyTokenRequest();
        console.log(`Datos del usuario recuperado:`, response.data);

        if (!response.data) return setIsAuthenticated(false);

        setIsAuthenticated(true);
        setUser(response.data);
        setLoading(false); // Deberia ser true
      } catch (error) {
        console.log("Error verifying token: ", error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  return (
    <Authcontext.Provider
      value={{
        signup,
        signin,
        user,
        isAuthenticated,
        errors,
        loading,
        logout,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};
