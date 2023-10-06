// generateCards.ts

import express, { Router, Request, Response } from "express";
import mongoose, { Types } from "mongoose";

const router: Router = express.Router();

router.post("/generate-cards", async (req: Request, res: Response) => {
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

    // Generate and insert cards for the collection
    const newCards = [];
    for (let i = 1; i <= collection.number_of_cards; i++) {
      newCards.push({
        collectionId: collection._id,
        cardNumber: i,
        // Add other card properties as needed
      });
    }

    const cards = db.collection("newCards");

    // Ensure uniqueness of cardNumber and collectionId
    await cards.createIndex(
      { cardNumber: 1, collectionId: 1 },
      { unique: true }
    );

    // Insert cards into the collection
    const result = await cards.insertMany(newCards);

    res.status(201).json(result);
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
});

export default router;
