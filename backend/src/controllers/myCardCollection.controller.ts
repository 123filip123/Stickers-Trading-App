import expressAsyncHandler from "express-async-handler";
import { CardCollection } from "../models/cardCollection.model";
import { UserCard } from "../models/userCard.model";
import { Card, ICard } from "../models/card.model";

export const getMyCardCollections = expressAsyncHandler(
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

export const getMyCardCollection = expressAsyncHandler(
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

export const getMyCardCollectionCards = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      if (!userId) {
        res.status(500);
        throw new Error("Cannot read user.");
      }

      // All cards from the collection. Unowned cards do not have the cardId object.
      const cards: any = await UserCard.find({ userId }).populate({
        path: "cardId",
        match: { collectionId: { $eq: id } },
      });

      const allOwnedCards = await UserCard.find({ userId });
      const allCardsInCollection = await Card.find({ collectionId: id });

      // Array of IDs from all of the owned cards
      const ownedCardIds = allOwnedCards.map((ownedCard) =>
        ownedCard.cardId.toString()
      );

      // Array of all missing cards from the collection
      const missingCards = allCardsInCollection.filter((cardInCollection) => {
        return !ownedCardIds.includes(cardInCollection._id.toString());
      });

      // Array of all owned cards from the collection
      const ownedCardsFromCollection = cards.filter(
        (card: any) => card.cardId !== null
      );

      const modifiedCards: ICard[] = [];

      // Add a modified version of each missing card to the modifiedCards array.
      missingCards.forEach((card) => {
        const modifiedCard = {
          id: String(card._id),
          card_number: card.cardNumber!,
          collection_id: String(card.collectionId),
          duplicates: 0,
        };
        modifiedCards.push(modifiedCard);
      });

      // Add a modified version of each owned card to the modifiedCards array.
      ownedCardsFromCollection.forEach((card: any) => {
        const modifiedCard = {
          id: String(card.cardId._id),
          user_id: String(card.userId),
          owned_id: String(card._id),
          card_number: card.cardId.cardNumber,
          collection_id: String(card.cardId.collectionId),
          duplicates: card.duplicates,
        };
        modifiedCards.push(modifiedCard);
      });

      // Sort the cards in ascending order by the card_number property
      modifiedCards.sort((a: ICard, b: ICard) => a.card_number - b.card_number);

      res.status(200).json(modifiedCards);
    } catch (error: any) {
      res.status(500);
      throw new Error("Error fetching the cards.");
    }
  }
);

export const getMyCardCollectionMissingCards = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      if (!userId) {
        res.status(500);
        throw new Error("Cannot read user.");
      }

      const ownedCards = await UserCard.find({ userId });

      const allCardsInCollection = await Card.find({ collectionId: id });

      const ownedCardIds = ownedCards.map((ownedCard) =>
        ownedCard.cardId.toString()
      ); // Convert cardId to string for comparison
      const missingCards = allCardsInCollection.filter((cardInCollection) => {
        return !ownedCardIds.includes(cardInCollection._id.toString());
      });

      console.log(missingCards);

      res.status(200).json(missingCards);
    } catch (error: any) {
      res.status(500);
      throw new Error("Error fetching the missing cards.");
    }
  }
);

export const downloadCardCollection = expressAsyncHandler(
  async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      if (!userId) {
        res.status(500);
        throw new Error("Cannot read user.");
      }
      console.log(11);
      // All cards from the collection. Unowned cards do not have the cardId object.
      const cards: any = await UserCard.find({ userId }).populate({
        path: "cardId",
        match: { collectionId: { $eq: id } },
      });
      console.log(22);
      const allOwnedCards = await UserCard.find({ userId });
      const allCardsInCollection = await Card.find({ collectionId: id });
      console.log(33);
      // Array of IDs from all of the owned cards
      const ownedCardIds = allOwnedCards.map((ownedCard) =>
        ownedCard.cardId.toString()
      );
      console.log(44);
      // Array of all missing cards from the collection
      const missingCards = allCardsInCollection.filter((cardInCollection) => {
        return !ownedCardIds.includes(cardInCollection._id.toString());
      });
      console.log(55);
      // Array of all owned cards from the collection
      const ownedCardsFromCollection = cards.filter(
        (card: any) => card.cardId !== null
      );
      console.log(66);
      const modifiedMissingCardNumbers = missingCards.map(
        (card) => card.cardNumber
      );
      const modifiedOwnedCardNumbers = ownedCardsFromCollection.map(
        (card: any) => {
          return {
            cardNumber: card.cardId.cardNumber,
            duplicates: card.duplicates,
          };
        }
      );

      // Sort both arrays by ascending cardNumber
      modifiedMissingCardNumbers.sort((a: any, b: any) => a - b);

      modifiedOwnedCardNumbers.sort(
        (a: any, b: any) => a.cardNumber - b.cardNumber
      );

      const modifiedDuplicateCardNumbers = modifiedOwnedCardNumbers.filter(
        (card: any) => card.duplicates > 0
      );

      const cardCollection = await CardCollection.findById(id);
      if (!cardCollection) {
        res.status(500);
        throw new Error("Cannot find collection.");
      }

      // Join the formatted duplicate card numbers

      const fileContent =
        "Generated by MyStickers!\n\n" +
        `${cardCollection.name}\n\n` +
        `Owned Cards:\n${modifiedOwnedCardNumbers
          .map((card: any) => card.cardNumber)
          .join(", ")}\n\n` +
        `Missing Cards:\n${modifiedMissingCardNumbers
          .map((cardNumber) => cardNumber)
          .join(", ")}\n\n` +
        `Duplicate Cards:\n${modifiedDuplicateCardNumbers
          .map((card: any) => `${card.cardNumber}(${card.duplicates})`)
          .join(", ")}`;

      // Set the response headers for downloading
      console.log(1);
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=categorized-cards.txt"
      );
      console.log(2);
      res.setHeader("Content-Type", "text/plain");
      console.log(3);
      // Send the text file content as the response

      res.send(fileContent);
      console.log(4);
      console.log("done!");
    } catch (error: any) {
      res.status(500);
      console.log("here? errror 500");
      throw new Error("Error fetching the cards.");
    }
  }
);
