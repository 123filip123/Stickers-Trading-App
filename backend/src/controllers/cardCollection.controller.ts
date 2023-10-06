import expressAsyncHandler from "express-async-handler";
import { CardCollection } from "../models/cardCollection.model";

export const getCardCollections = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const collections = await CardCollection.find({});
      res.status(200).json(collections);
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
);

export const getCardCollection = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const collection = await CardCollection.findById(id);
      res.status(200).json(collection);
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
);

export const putCardCollection = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const collection = await CardCollection.findByIdAndUpdate(id, req.body);
      if (!collection) {
        res.status(404);
        throw new Error(`Cannot find any product with ID ${id}`);
      }
      const updatedCollection = await CardCollection.findById(id);
      res.status(200).json(updatedCollection);
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
);

export const postCardCollection = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const collection = await CardCollection.create(req.body);
      res.status(200).json(collection);
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
);

export const deleteCardCollection = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const collection = await CardCollection.findByIdAndDelete(id);
      if (!collection) {
        res.status(404);
        throw new Error(`Cannot find any product with ID ${id}`);
      }
      res.status(200).json(collection);
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
);
