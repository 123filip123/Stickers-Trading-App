import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

//
//@desc Register a user
//@route POST /api/users/register
//@access public
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  console.log({ email, password, username });
  if (!email || !password || !username) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  const user = await User.create({
    email,
    password,
    username,
  });

  if (user) {
    res
      .status(201)
      .json({ _id: user.id, email: user.email, username: user.username });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
export const loginUser = expressAsyncHandler(async (req, res) => {
  const { emailOrUsername, password } = req.body;
  if (!emailOrUsername || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userWithEmail = await User.findOne({ email: emailOrUsername });
  const userWithUsername = await User.findOne({ username: emailOrUsername });
  const user = userWithEmail ?? userWithUsername;
  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials.");
  }
  //compare password with hashedpassword
  const isPasswordMatch = await bcrypt.compare(
    password,
    user ? user.password : ""
  );

  if (user && isPasswordMatch) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    console.log(accessTokenSecret);
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      accessTokenSecret!
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid credentials.");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
export const currentUser = expressAsyncHandler(async (req: any, res) => {
  res.json(req.user);
});
