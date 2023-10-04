import axios from "axios";
axios.defaults.withCredentials = true;

const instance = axios.create({
  // Local Server
  baseURL: "http://localhost:8080/api",

  // Amazon EC2 Server
  // baseURL: "http://ec2-54-89-206-14.compute-1.amazonaws.com/api", // Pending SSL Certificate
  // baseURL: "http://ec2-54-89-206-14.compute-1.amazonaws.com:8080/api",

  // Render Server
  // baseURL: "https://tasks-server-mern.onrender.com/api",

  // Vercel Server
  // baseURL: "https://backend-eta-six.vercel.app/api",
  withCredentials: true,
});

export default instance;
