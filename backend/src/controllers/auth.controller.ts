import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

//
//@desc Register a user
//@route POST /api/users/register
//@access public
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, password, first_name, last_name, nickname } = req.body;
  console.log({ email, password, first_name, last_name, nickname });
  if (!email || !password || !first_name || !last_name || !nickname) {
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
    first_name,
    last_name,
    nickname,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
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
    throw new Error("Email or password is not valid");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
export const currentUser = expressAsyncHandler(async (req: any, res) => {
  res.json(req.user);
});
