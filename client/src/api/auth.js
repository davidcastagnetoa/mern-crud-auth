import axios from "./axios";
axios.defaults.withCredentials = true;

export const registerRequest = async (user) => {
  // Convierte birthDate a objeto Date si es necesario. Recuerda modificar el backend para asegurar que siempre recibe un Objeto Date, esto es sólo para pruebas en Postman
  if (user.birthDate && typeof user.birthDate === "string") {
    user.birthDate = new Date(user.birthDate);
  }
  const response = await axios.post(`/register`, user);
  console.log("response received in register: ", response);
  return response;
};

export const loginRequest = async (user) => {
  // const response = await axios.post(`${api}/login`, user);
  const response = await axios.post(`/login`, user);
  console.log("response received in login: ", response); // Obtiene datos de usuario
  return response;
};

export const logoutRequest = async () => {
  const response = await axios.post("/logout", null, { withCredentials: true });
  if (!response) {
    console.log("No te has deslogado, revisa el codigo joder!!");
  }
  console.log("Bien, te has deslogado!", response);
};

export const verifyTokenRequest = async () => {
  const response = await axios.get(`/verify`, { withCredentials: true });
  if (!response) {
    console.log("No hay ningun token recuperado, revisa el codigo joder!!");
  }
  console.log("Estos son los datos verificados", response);
  return response;
};
