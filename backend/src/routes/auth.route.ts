import express from "express";
import { validateToken } from "../middleware/validateTokenHandler";
import {
  changePassword,
  checkResetCode,
  currentUser,
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller";

export const authRoute = express.Router();

authRoute.post("/register", registerUser);

authRoute.post("/login", loginUser);

authRoute.get("/current", validateToken, currentUser);

authRoute.put("/change_password", validateToken, changePassword);

authRoute.post("/forgot_password", forgotPassword);

authRoute.post("/check_reset_code", checkResetCode);

authRoute.put("/reset_password", resetPassword);
