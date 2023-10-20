import express from "express";
import {
  deleteCardCollection,
  getCardCollection,
  getCardCollections,
  postCardCollection,
} from "../controllers/cardCollection.controller";
import { validateToken } from "../middleware/validateTokenHandler";

export const cardCollectionRoute = express.Router();

cardCollectionRoute.get("/", validateToken, getCardCollections);

cardCollectionRoute.get("/:id", validateToken, getCardCollection);

cardCollectionRoute.post("/", validateToken, postCardCollection);

cardCollectionRoute.delete("/:id", validateToken, deleteCardCollection);
