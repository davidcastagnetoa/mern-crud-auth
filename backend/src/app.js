import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(cors());

// app.use(
//   cors({
//     // origin: FRONTEND_URL,
//     origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
//     credentials: true,
//   })
// );

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(taskRoutes);

export default app;
