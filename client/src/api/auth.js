import axios from "./axios";
axios.defaults.withCredentials = true;

export const registerRequest = async (user) => {
  // const response = await axios.post(`${api}/register`, user);
  const response = await axios.post(`/register`, user);
  console.log(response);
  return response;
};

export const loginRequest = async (user) => {
  // const response = await axios.post(`${api}/login`, user);
  const response = await axios.post(`/login`, user);
  console.log("response received: ", response); // Obtiene datos de usuario
  return response;
};

export const logoutRequest = async () => {
  const response = await axios.get("/logout");
  if (!response) {
    console.log("No te has deslogado, revisa el codigo joder!!");
  }
  console.log("response", response);
};

export const verifyTokenRequest = async () => {
  const response = await axios.get(`/verify`, { withCredentials: true });
  if (!response) {
    console.log("No hay ningun token recuperado, revisa el codigo joder!!");
  }
  return response;
};
