import express from "express";
import {
  deleteCardCollection,
  downloadCardCollection,
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

cardCollectionRoute.get("/:id/download", validateToken, downloadCardCollection);
