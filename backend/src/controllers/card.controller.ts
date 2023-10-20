// generateCards.ts

import { Card } from "../models/card.model";
import expressAsyncHandler from "express-async-handler";

export const getCards = expressAsyncHandler(async (req: any, res: any) => {
  try {
    const cards = await Card.find(req.body);
    res.status(200).json(cards);
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
});

export const putCard = expressAsyncHandler(async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { owned, duplicates } = req.body;
    const card = await Card.findById(id);

    if (!card) {
      res.status(500);
      throw new Error("Cannot read card.");
    }

    if (!owned) {
      // update card, set owned value to false and duplicates value to 0
      await Card.findByIdAndUpdate(id, { owned: false, duplicates: 0 });
    } else {
      // update card, set new owned value to owned and new duplicates to duplicates
      await Card.findByIdAndUpdate(id, { owned, duplicates });
    }

    const updatedCard = await Card.findById(id);

    res.status(200).json(updatedCard);
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
});
