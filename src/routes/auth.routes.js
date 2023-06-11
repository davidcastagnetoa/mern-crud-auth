import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Registe
router.post("/api/register", register);

// Login
router.post("/api/login", login);

// Logout
router.post("/api/logout", logout);

// Protected
router.get("/api/profile", authRequired, profile);

export default router;
