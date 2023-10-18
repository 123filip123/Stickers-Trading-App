import mongoose, { Types } from "mongoose";

export interface ICard {
  id: string;
  card_number: number;
  collection_id: string;
  duplicates: number;
  user_id?: string;
  owned_id?: string;
}

const cardSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: Number,
      reqired: true,
    },
    collectionId: {
      type: Types.ObjectId,
      ref: "CardCollection",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

cardSchema.index({ cardNumber: 1, collectionId: 1 }, { unique: true });

export const Card = mongoose.model("Card", cardSchema);
