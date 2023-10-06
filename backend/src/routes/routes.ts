import { cardCollectionRoute } from "./cardCollection.route";
import express from "express";
import { userRoute } from "./user.route";
import { cardRoute } from "./card.route";

export const router = express.Router();

const defaultRoutes = [
  {
    path: "/card_collections",
    route: cardCollectionRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/cards",
    route: cardRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
