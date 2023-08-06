import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

const whitelist = [
  "https://mern-crud-auth.vercel.app",
  "http://localhost:5173",
];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// };

// app.use(cors(corsOptions));

app.use(
  cors({
    origin: whitelist,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(taskRoutes);

export default app;
