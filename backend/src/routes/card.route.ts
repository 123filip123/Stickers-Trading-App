import express from "express";
import { getCards, putCard } from "../controllers/card.controller";
import { validateToken } from "../middleware/validateTokenHandler";

export const cardRoute = express.Router();

cardRoute.get("/", validateToken, getCards);

cardRoute.put("/:id", validateToken, putCard);
