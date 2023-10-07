import express from "express";
import {
  generateCardsForCollection,
  getCards,
} from "../controllers/card.controller";

export const cardRoute = express.Router();

cardRoute.post("/", generateCardsForCollection);

cardRoute.get("/", getCards);
