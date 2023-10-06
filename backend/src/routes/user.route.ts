import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
} from "../controllers/user.controller";

export const userRoute = express.Router();

userRoute.get("/", getUsers);

userRoute.get("/:id", getUser);

userRoute.put("/:id", putUser);

userRoute.post("/", postUser);

userRoute.delete("/:id", deleteUser);
