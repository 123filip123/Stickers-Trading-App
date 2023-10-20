import { cardCollectionRoute } from "./cardCollection.route";
import express from "express";
import { userRoute } from "./user.route";
import { cardRoute } from "./card.route";
import { authRoute } from "./auth.route";

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
  {
    path: "/auth",
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
