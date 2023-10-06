import mongoose, { Types } from "mongoose";

const userCardSchema = new mongoose.Schema(
  {
    collectionId: {
      type: Types.ObjectId,
      ref: "CardCollection",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User", // Replace with your user model name
      required: true,
    },
    cardNumber: {
      type: Number,
      reqired: true,
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

userCardSchema.index(
  { userId: 1, collectionId: 1, cardNumber: 1 },
  { unique: true }
);

export const UserCard = mongoose.model("UserCard", userCardSchema);
