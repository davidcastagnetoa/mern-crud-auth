import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/tasks.controllers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/api/tasks", authRequired, getTasks);

router.get("/api/tasks/:id", authRequired, getTask);

router.post(
  "/api/tasks",
  authRequired,
  validateSchema(createTaskSchema),
  createTask
);

router.delete("/api/tasks/:id", authRequired, deleteTask);

router.put("/api/tasks/:id", authRequired, updateTask);

export default router;
