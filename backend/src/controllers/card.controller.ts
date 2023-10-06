// generateCards.ts

import mongoose, { Types } from "mongoose";
import { Card } from "../models/card.model";
import expressAsyncHandler from "express-async-handler";

export const generateCardsForCollection = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { collectionId } = req.body;

      const db = mongoose.connection;

      const cardCollectionsCollection = db.collection("cardcollections");
      const collection = await cardCollectionsCollection.findOne({
        _id: new Types.ObjectId(collectionId),
      });

      if (!collection) {
        return res.status(404).json({ message: "Card collection not found" });
      }

      // Generate and insert cards for the collection using the Card model
      const cards = [];
      for (let i = 1; i <= collection.number_of_cards; i++) {
        cards.push({
          cardNumber: i,
          collectionId: collection._id,
          // Add other card properties as needed
        });
      }

      // Use the Card model to insert cards
      const insertedCards = await Card.insertMany(cards);

      res
        .status(201)
        .json({ message: `${insertedCards.length} cards generated` });

      console.log(`${insertedCards.length} cards generated`);
    } catch (error: any) {
      // Handle duplicate key error (11000) when inserting duplicate cards
      if (error.code === 11000) {
        console.error("Duplicate key error:", error);
        return res
          .status(400)
          .json({ message: "Duplicate cards are not allowed" });
      }

      console.error("Error generating cards:", error);
      res
        .status(500)
        .json({ message: "An error occurred while generating cards" });
    }
  }
);
