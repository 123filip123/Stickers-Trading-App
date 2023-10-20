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
    collection_id: {
      type: Types.ObjectId,
      ref: "CardCollection",
      required: true,
    },
    user_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    card_number: {
      type: Number,
      reqired: true,
    },
    owned: {
      type: Boolean,
      required: true,
      default: false,
    },
    duplicates: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

cardSchema.index({ card_number: 1, collection_id: 1 }, { unique: true });

export const Card = mongoose.model("Card", cardSchema);
