import expressAsyncHandler from "express-async-handler";
import { User } from "../models/user.model";

export const getUsers = expressAsyncHandler(async (req: any, res: any) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
});

export const getUser = expressAsyncHandler(async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
});

export const putUser = expressAsyncHandler(async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      res.status(404);
      throw new Error(`Cannot find any product with ID ${id}`);
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
});

export const postUser = expressAsyncHandler(async (req: any, res: any) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
});

export const deleteUser = expressAsyncHandler(async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404);
      throw new Error(`Cannot find any product with ID ${id}`);
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
});
