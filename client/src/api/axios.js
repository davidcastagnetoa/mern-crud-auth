import axios from "axios";

const instance = axios.create({
  // Local Server
  // baseURL: "http://localhost:3000/api",

  // Amazon EC2 Server
  // baseURL: "http://ec2-3-95-237-242.compute-1.amazonaws.com/api",

  // Render Server
  // baseURL: "https://tasks-server-mern.onrender.com/api",

  // Vercel Server
  baseURL: "https://mern-crud-auth-backend.vercel.app/api",
  withCredentials: true,
});

export default instance;
