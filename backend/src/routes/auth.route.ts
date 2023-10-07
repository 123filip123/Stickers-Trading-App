import express from "express";
import { validateToken } from "../middleware/validateTokenHandler";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../controllers/auth.controller";

export const authRoute = express.Router();

authRoute.post("/register", registerUser);

authRoute.post("/login", loginUser);

authRoute.get("/current", validateToken, currentUser);
