import mongoose from "mongoose";

const cardCollectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      reqired: [true, "Please enter a collection name"],
    },
    user_id: {
      type: String,
      required: true,
    },
    number_of_cards: {
      type: Number,
      required: [true, "Please enter the number of cards"],
    },
  },
  {
    timestamps: true,
  }
);

export const CardCollection = mongoose.model(
  "CardCollection",
  cardCollectionSchema
);
