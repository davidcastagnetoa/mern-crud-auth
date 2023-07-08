import axios from "axios";

const api = "http://localhost:3000/api";

// export const registerRequest = async (user) =>
//   axios.post(`${api}/register`, user);

export const registerRequest = async (user) => {
  const response = await axios.post(`${api}/register`, user);
  console.log(response);
  return response;
};

export const loginRequest = async (user) => axios.post(`${api}/login`, user);
