import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "http://ec2-44-204-81-214.compute-1.amazonaws.com/api",
  // baseURL: "https://tasks-server-mern.onrender.com/api",
  withCredentials: true,
});

export default instance;
