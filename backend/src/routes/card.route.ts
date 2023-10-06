import express from "express";
import { generateCardsForCollection } from "../controllers/card.controller";

export const cardRoute = express.Router();

cardRoute.post("/", generateCardsForCollection);
