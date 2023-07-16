import axios from "axios";

const api = "http://localhost:3000/api";

export const registerRequest = async (user) => {
  const response = await axios.post(`${api}/register`, user);
  console.log(response);
  return response;
};

export const loginRequest = async (user) => {
  const response = await axios.post(`${api}/login`, user);
  return response;
};
