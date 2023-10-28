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
// export const newToken = (email: string) =>
//   new ResetToken({
//     email,
//     token: Math.floor(100000 + Math.random() * 900000),
//     expires: new Date(Date.now() + 15 * 60 * 1000), // 15 min
//   });

export const newResetToken = async (email: string) => {
  // Check if a token with the given email already exists
  const existingToken = await ResetToken.findOne({ email });

  if (existingToken) {
    // If a token exists, delete the old token
    await ResetToken.deleteOne({ email: existingToken.email });
  }

  // Generate a new reset token and save it to the database
  const newToken = new ResetToken({
    email,
    token: Math.floor(100000 + Math.random() * 900000).toString(),
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
  });

  await newToken.save();

  return newToken;
};
