import mongoose from "mongoose";

export interface ICardCollection {
  id: string;
  name: string;
  number_of_cards: number;
  image?: string;
}

const cardCollectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      reqired: [true, "Please enter a collection name"],
    },
    number_of_cards: {
      type: Number,
      required: [true, "Please enter the number of cards"],
    },
    image: {
      type: String,
      required: false,
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
