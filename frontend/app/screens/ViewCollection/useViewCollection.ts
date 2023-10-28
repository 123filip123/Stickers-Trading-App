import { useEffect, useState } from "react";
import { ICard } from "../../models/Card";
import { CARDS_TOGGLE_FILTER } from "../../components/common/CardsToggleGroupFilter";
import { axiosApi } from "../../network/Auth/config/config";
import { Endpoints } from "../../network/endpoints";
import { Logs } from "expo";
import Toast from "react-native-toast-message";

export const useViewCollection = (id: string): TUseViewCollectionReturn => {
  Logs.enableExpoCliLogging();

  const [cards, setCards] = useState<ICard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cardsToggleFilter, setCardToggleFilter] =
    useState<CARDS_TOGGLE_FILTER>(CARDS_TOGGLE_FILTER.ALL);

  const getMyCollectionCards = async () => {
    setIsLoading(true);
    try {
      const api = await axiosApi();
      const response = await api.get(
        Endpoints.getMyCollectionCards(id as string)
      );
      setCards(response.data.cards);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyCollectionCards();
  }, []);

  const addCard = (newCard: ICard) => {
    const updatedCards = cards.map((card) => {
      if (card._id === newCard._id) {
        // Replace the existing card with the new card
        return newCard;
      }
      // Keep the card as-is
      return card;
    });
    setCards(updatedCards);
  };

  return [
    cards,
    isLoading,
    searchValue,
    setSearchValue,
    cardsToggleFilter,
    setCardToggleFilter,
    addCard,
  ];
};

type TUseViewCollectionReturn = [
  ICard[],
  boolean,
  string,
  React.Dispatch<React.SetStateAction<string>>,
  CARDS_TOGGLE_FILTER,
  React.Dispatch<React.SetStateAction<CARDS_TOGGLE_FILTER>>,
  (newCard: ICard) => void
];
