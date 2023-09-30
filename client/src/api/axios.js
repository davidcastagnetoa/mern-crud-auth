import axios from "axios";
axios.defaults.withCredentials = true;

const instance = axios.create({
  // Local Server
  // baseURL: "http://localhost:8080/api",

  // Amazon EC2 Server
  // baseURL: "http://ec2-54-89-206-14.compute-1.amazonaws.com/api",
  baseURL: "http://ec2-54-89-206-14.compute-1.amazonaws.com:8080/api",

  // Render Server
  // baseURL: "https://tasks-server-mern.onrender.com/api",

  // Vercel Server
  // baseURL: "https://mern-crud-auth-backend.vercel.app/api", // En reparacion
  withCredentials: true,
});

export default instance;
