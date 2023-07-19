import axios from "./axios";
// import axios from "axios";

// const api = "http://localhost:3000/api";

export const registerRequest = async (user) => {
  // const response = await axios.post(`${api}/register`, user);
  const response = await axios.post(`/register`, user);
  console.log(response);
  return response;
};

export const loginRequest = async (user) => {
  // const response = await axios.post(`${api}/login`, user);
  const response = await axios.post(`/login`, user);
  return response;
};

// export const verifyTokenRequest = async (token) => {
//   // const response = await axios.get(`${api}/auth/verifyToken`, token);
//   const response = await axios.get(`/verify`, token);
//   return response;
// };

// export const verifyTokenRequest = () => axios.get("/verify");

export const verifyTokenRequest = async (token) => {
  const response = await axios.get(`/verify`, { headers: { Authorization: `Bearer ${token}` } });
  return response;
};
