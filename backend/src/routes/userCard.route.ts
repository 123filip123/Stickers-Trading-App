import express from "express";
import { validateToken } from "../middleware/validateTokenHandler";
import {
  addUserCard,
  changeUserCardDuplicates,
  deleteUserCard,
  getUserCards,
} from "../controllers/userCard.controller";

export const userCardRoute = express.Router();

userCardRoute.post("/", validateToken, addUserCard);

userCardRoute.get("/", validateToken, getUserCards);

userCardRoute.put("/:id", validateToken, changeUserCardDuplicates);

userCardRoute.delete("/:id", validateToken, deleteUserCard);
