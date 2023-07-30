import axios from "./axios";

export const registerRequest = async (user) => {
  // const response = await axios.post(`${api}/register`, user);
  const response = await axios.post(`/register`, user);
  // Guarda el token en las cookies
  document.cookie = `token=${response.data.token}`;
  console.log(response);
  return response;
};

export const loginRequest = async (user) => {
  // const response = await axios.post(`${api}/login`, user);
  const response = await axios.post(`/login`, user);
  // Guarda el token en las cookies
  document.cookie = `token=${response.data.token}`;
  // Guardar el token en el almacenamiento local
  // localStorage.setItem('token', response.data.token);
  return response;
};

// export const verifyTokenRequest = async (token) => {
//   // Obtener el token del almacenamiento local
//   // const token = localStorage.getItem("token");
//   const response = await axios.get(`/verify`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response;
// };

export const verifyTokenRequest = async () => {
  // Obtiene el token de las cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    .split("=")[1];
  const response = await axios.get(`/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
