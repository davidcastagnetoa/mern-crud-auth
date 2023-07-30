import axios from "axios";
// import { API_URL } from "../config.js";

const instance = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://tasks-server-mern.onrender.com/api",
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});

export default instance;
