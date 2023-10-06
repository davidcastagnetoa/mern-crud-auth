import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // Importa tu AuthContext para acceder al idioma del usuario

// Crear el contexto
export const LanguageContext = createContext();

// Crear el proveedor del contexto
export const LanguageProvider = ({ children }) => {
  const { user } = useAuth(); // Obtén el usuario del AuthContext
  const [language, setLanguage] = useState(user ? user.language : "english"); // Configura el idioma inicial

  // Puedes añadir cualquier otra lógica aquí, como un useEffect para manejar cambios en el idioma del usuario.
  useEffect(() => {
    if (user) {
      setLanguage(user.language);
    }
  }, [user]);

  // Los datos y las funciones que quieras exponer
  const contextValue = {
    language,
    setLanguage,
  };

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

// Crear un hook personalizado para utilizar este contexto más fácilmente
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
};
