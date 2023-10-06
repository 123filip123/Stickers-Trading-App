import mongoose, { Types } from "mongoose";

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
