import { Router } from "express";
import { register, login, logout, profile, verifyToken } from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

// Register
router.post("/api/register", validateSchema(registerSchema), register);

// Login
router.post("/api/login", validateSchema(loginSchema), login);

// Logout
router.post("/api/logout", logout);

// Protected
router.get("/api/profile", authRequired, profile);

router.get("/api/verify", verifyToken);

export default router;
