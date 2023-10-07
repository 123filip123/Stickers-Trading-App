import { cardCollectionRoute } from "./cardCollection.route";
import express from "express";
import { userRoute } from "./user.route";
import { cardRoute } from "./card.route";
import { authRoute } from "./auth.route";
import { userCardRoute } from "./userCard.route";
import { myCardCollectionRoute } from "./myCardCollection.route";

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
  {
    path: "/user_cards",
    route: userCardRoute,
  },
  {
    path: "/my_card_collections",
    route: myCardCollectionRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
