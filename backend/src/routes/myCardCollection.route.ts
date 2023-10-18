import express from "express";
import {
  downloadCardCollection,
  getMyCardCollection,
  getMyCardCollectionCards,
  getMyCardCollectionMissingCards,
  getMyCardCollections,
} from "../controllers/myCardCollection.controller";
import { validateToken } from "../middleware/validateTokenHandler";

export const myCardCollectionRoute = express.Router();

myCardCollectionRoute.get("/", validateToken, getMyCardCollections);

myCardCollectionRoute.get("/:id", validateToken, getMyCardCollection);

myCardCollectionRoute.get(
  "/:id/cards",
  validateToken,
  getMyCardCollectionCards
);

myCardCollectionRoute.get(
  "/:id/missing_cards",
  validateToken,
  getMyCardCollectionMissingCards
);

myCardCollectionRoute.get(
  "/:id/download",
  validateToken,
  downloadCardCollection
);
