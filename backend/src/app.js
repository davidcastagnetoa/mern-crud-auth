import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// app.use(cors({ credentials: true }));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(taskRoutes);

export default app;
