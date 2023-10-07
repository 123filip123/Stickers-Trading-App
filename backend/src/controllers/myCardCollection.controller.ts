import expressAsyncHandler from "express-async-handler";
import { CardCollection } from "../models/cardCollection.model";
import { UserCard } from "../models/userCard.model";
import { Card } from "../models/card.model";

export const getMyCardCollections = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const collections = await CardCollection.find({});
      res.status(200).json(collections);
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
);

export const getMyCardCollection = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const collection = await CardCollection.findById(id);
      res.status(200).json(collection);
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
);

export const getMyCardCollectionCards = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      if (!userId) {
        res.status(500);
        throw new Error("Cannot read user.");
      }

      const cards = await UserCard.find({ userId })
        .populate({
          path: "cardId",
          match: { collectionId: { $eq: id } },
        })
        .then((cards) => cards.filter((card) => card.cardId !== null));
      res.status(200).json(cards);
    } catch (error: any) {
      res.status(500);
      throw new Error("Error fetching the cards.");
    }
  }
);

export const getMyCardCollectionMissingCards = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      if (!userId) {
        res.status(500);
        throw new Error("Cannot read user.");
      }

      const ownedCards = await UserCard.find({ userId });

      const allCardsInCollection = await Card.find({ collectionId: id });

      const ownedCardIds = ownedCards.map((ownedCard) =>
        ownedCard.cardId.toString()
      ); // Convert cardId to string for comparison
      const missingCards = allCardsInCollection.filter((cardInCollection) => {
        return !ownedCardIds.includes(cardInCollection._id.toString());
      });

      console.log(missingCards);

      res.status(200).json(missingCards);
    } catch (error: any) {
      res.status(500);
      throw new Error("Error fetching the missing cards.");
    }
  }
);
