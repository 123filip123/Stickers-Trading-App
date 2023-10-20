import mongoose from "mongoose";

const resetTokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      reqired: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

// Create a new token and store it in MongoDB
export const newToken = (email: string) =>
  new ResetToken({
    email,
    token: Math.floor(100000 + Math.random() * 900000),
    expires: new Date(Date.now() + 15 * 60 * 1000), // 24 hours in milliseconds
  });
