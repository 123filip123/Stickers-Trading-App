import express from "express";
import {
  deleteCardCollection,
  getCardCollection,
  getCardCollections,
  postCardCollection,
  putCardCollection,
} from "../controllers/cardCollection.controller";

export const cardCollectionRoute = express.Router();

cardCollectionRoute.get("/", getCardCollections);

cardCollectionRoute.get("/:id", getCardCollection);

cardCollectionRoute.put("/:id", putCardCollection);

cardCollectionRoute.post("/", postCardCollection);

cardCollectionRoute.delete("/:id", deleteCardCollection);
