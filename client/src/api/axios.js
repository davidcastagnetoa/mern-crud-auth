import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000/api",
  // baseURL: "http://ec2-3-95-237-242.compute-1.amazonaws.com/api",
  // baseURL: "https://tasks-server-mern.onrender.com/api",
  baseURL: "https://mern-crud-auth-backend.vercel.app/api",
  withCredentials: true,
});

export default instance;
