import expressAsyncHandler from "express-async-handler";
import { UserCard } from "../models/userCard.model";
import { Card, ICard } from "../models/card.model";

export const addUserCard = expressAsyncHandler(async (req: any, res: any) => {
  try {
    const { cardId, duplicates } = req.body;
    const userId = req.user.id;

    if (!userId) {
      res.status(500);
      throw new Error("Error loading user.");
    }

    // Find the card
    const card = await Card.findOne({ _id: cardId });

    if (!card) {
      res.status(500);
      throw new Error("Can't find card.");
    }

    const newUserCard = new UserCard({
      userId,
      cardId,
      duplicates,
    });

    const response = await UserCard.create(newUserCard);
    const newCard = {
      id: response.cardId,
      user_id: response.userId,
      owned_id: response._id,
      duplicates: response.duplicates,
      card_number: card.cardNumber,
      collection_id: card.collectionId,
    };
    // return res.status(201).json(response);
    console.log(newCard);
    return res.status(201).json(newCard);
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
});

export const getUserCards = expressAsyncHandler(async (req: any, res: any) => {
  try {
    const { collectionId, userId, cardId, findDuplicates } = req.body;
    const query: any = {};
    if (userId) {
      query.userId = userId;
    }
    if (cardId) {
      query.cardId = cardId;
    }

    let cards;

    if (findDuplicates) {
      cards = await UserCard.find(query)
        .populate({
          path: "cardId",
        })
        .sort("-duplicates")
        .then((cards) => cards.filter((card) => card.duplicates > 0));
    } else {
      if (collectionId) {
        cards = await UserCard.find(query)
          .populate({
            path: "cardId",
            match: { collectionId: { $eq: collectionId } },
          })
          .then((cards) => cards.filter((card) => card.cardId !== null));
      } else {
        cards = await UserCard.find(query);
      }
    }

    res.status(200).json(cards);
  } catch (error: any) {
    res.status(500);
    throw new Error(error.message);
  }
});

export const changeUserCardDuplicates = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const { duplicates } = req.body;
      const userId = req.user.id;

      if (!userId) {
        res.status(500);
        throw new Error("Error loading user.");
      }
      const card = await UserCard.findOneAndUpdate(
        { _id: id, userId },
        { duplicates }
      );

      if (!card) {
        res.status(404);
        throw new Error(`Cannot find any card with ID ${id}`);
      }
      const updatedCard = await UserCard.findById(id);
      const cardInCollection = await Card.findOne({ _id: updatedCard?.cardId });

      if (!cardInCollection) {
        res.status(500);
        throw new Error("Can't find card.");
      }

      const newCard = {
        id: updatedCard!.cardId,
        user_id: updatedCard!.userId,
        owned_id: updatedCard!._id,
        duplicates: updatedCard!.duplicates,
        card_number: cardInCollection.cardNumber,
        collection_id: cardInCollection.collectionId,
      };
      res.status(200).json(newCard);
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
);

export const deleteUserCard = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      if (!userId) {
        res.status(500);
        throw new Error("Error loading user.");
      }
      const card = await UserCard.findOneAndDelete({ _id: id, userId });
      if (!card) {
        res.status(404);
        throw new Error(`Cannot find any card with ID ${id}`);
      }

      // Return the card from collection
      const cardInCollection = await Card.findOne({ _id: card.cardId });
      if (!cardInCollection) {
        res.status(404);
        throw new Error(`Cannot find any card with ID ${id}`);
      }
      const responseCard: ICard = {
        id: String(cardInCollection._id),
        collection_id: String(cardInCollection.collectionId),
        card_number: cardInCollection.cardNumber!,
        duplicates: 0,
      };
      res.status(200).json(responseCard);
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
);
