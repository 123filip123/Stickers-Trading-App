import expressAsyncHandler from "express-async-handler";
import { CardCollection } from "../models/cardCollection.model";
import { Card } from "../models/card.model";

export const getCardCollections = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const userId = req.user.id;

      if (!userId) {
        res.status(500);
        throw new Error("Cannot read user.");
      }
      const collections = await CardCollection.find({ user_id: userId }).sort({
        updatedAd: -1,
      });
      res.status(200).json(collections);
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
);

export const getCardCollection = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const cards = await Card.find({ collection_id: id as string });
      const collection = await CardCollection.findById(id);

      res.status(200).json({ ...collection, cards });
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
);

export const postCardCollection = expressAsyncHandler(
  async (req: any, res: any) => {
    const userId = req.user.id;

    if (!userId) {
      res.status(500);
      throw new Error("Cannot read user.");
    }

    try {
      const collection = await CardCollection.create({
        user_id: userId,
        ...req.body,
      });

      // Generate and insert cards for the collection using the Card model
      const cards = [];
      for (let i = 1; i <= collection.number_of_cards; i++) {
        cards.push({
          card_number: i,
          collection_id: collection._id,
          user_id: userId,
          // Add other card properties as needed
        });
      }

      // Use the Card model to insert cards
      await Card.insertMany(cards);

      res.status(201).json({ message: `Collection successfully created!` });
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
);

export const deleteCardCollection = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const collection = await CardCollection.findByIdAndDelete(id);
      if (!collection) {
        res.status(404);
        throw new Error(`Cannot find any collection with ID ${id}`);
      }

      // also delete all cards that collection_id is equal to id
      await Card.deleteMany({ collection_id: id });

      res.status(200).json("Collection deleted.");
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
);
