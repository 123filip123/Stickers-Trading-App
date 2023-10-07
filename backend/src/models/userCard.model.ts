import mongoose, { Types } from "mongoose";

const userCardSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardId: {
      type: Types.ObjectId,
      ref: "Card",
      required: true,
    },
    duplicates: {
      type: Number,
      reqired: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userCardSchema.index({ userId: 1, cardId: 1 }, { unique: true });

export const UserCard = mongoose.model("UserCard", userCardSchema);
