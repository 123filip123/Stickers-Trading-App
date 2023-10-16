import { Stack, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Input, ScrollView, View } from "tamagui";
import { ActivityIndicator, StyleSheet } from "react-native";
import { ICard } from "../../../models/Card";
import { axiosApi } from "../../../network/Auth/config/config";
import { Endpoints } from "../../../network/endpoints";
import { BORDER_RADIUS, colors } from "../../../globalConstants";
import { CardsToggleGroupFilter } from "../CardsToggleGroupFilter";
import { CardComponent } from "../CardComponent";

enum CARDS_TOGGLE_FILTER {
  ALL = "All",
  OWNED = "Owned",
  MISSING = "Missing",
}

const CollectionPreview = () => {
  const { id } = useSearchParams();
  const [cards, setCards] = useState<ICard[]>([]);
  const [collectionName, setCollectionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cardsToggleFilter, setCardToggleFilter] =
    useState<CARDS_TOGGLE_FILTER>(CARDS_TOGGLE_FILTER.ALL);
  useEffect(() => {
    getMyCollectionCards();
  }, []);

  const getMyCollectionCards = async () => {
    setIsLoading(true);
    try {
      const api = await axiosApi();
      const response = await api.get(
        Endpoints.getMyCollectionCards(id as string)
      );
      setCards(response.data);
      await getCollectionName();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getCollectionName = async () => {
    setIsLoading(true);
    try {
      const api = await axiosApi();
      const response = await api.get(Endpoints.getCollection(id as string));
      setCollectionName(response.data.name);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Function for adding a new card from the modal
  const addCard = (newCard: ICard) => {
    const updatedCards = cards.map((card) => {
      if (card.id === newCard.id) {
        // Replace the existing card with the new card
        return newCard;
      }
      // Keep the card as-is
      return card;
    });
    setCards(updatedCards);
  };

  if (isLoading) {
    return (
      <View
        borderRadius={BORDER_RADIUS}
        padding={5}
        flex={1}
        justifyContent="center"
        alignItems="center"
        height="auto"
        backgroundColor={colors.white}
      >
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  const shouldRenderCard = (card: ICard) => {
    switch (cardsToggleFilter) {
      case CARDS_TOGGLE_FILTER.OWNED: {
        if (!!card.owned_id) {
          return (
            searchValue === "" || String(card.card_number).includes(searchValue)
          );
        } else return false;
      }
      case CARDS_TOGGLE_FILTER.MISSING: {
        if (!card.owned_id) {
          return (
            searchValue === "" || String(card.card_number).includes(searchValue)
          );
        } else return false;
      }
      default: {
        return (
          searchValue === "" || String(card.card_number).includes(searchValue)
        );
      }
    }
  };

  const setToggleGroupValue = (value: CARDS_TOGGLE_FILTER) => {
    setCardToggleFilter(value);
  };

  return (
    <View backgroundColor="white" borderRadius={BORDER_RADIUS} padding={5}>
      <View width="100%" justifyContent="center" alignItems="center" margin={5}>
        <CardsToggleGroupFilter
          value={cardsToggleFilter}
          setValue={setToggleGroupValue}
        />
      </View>
      <View margin={5}>
        <Input
          placeholder="Search"
          keyboardType="numeric"
          onChangeText={setSearchValue}
        />
      </View>
      <ScrollView borderRadius={BORDER_RADIUS}>
        <Stack.Screen options={{ headerTitle: `${collectionName}` }} />
        <View style={styles.gridContainer}>
          {cards.map((card) => {
            if (shouldRenderCard(card)) {
              return (
                <CardComponent
                  key={card.card_number}
                  card={card}
                  collectionName={collectionName}
                  addCard={addCard}
                />
              );
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
};
export default CollectionPreview;

const styles = StyleSheet.create({
  gridContainer: {
    backgroundColor: colors.gray,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: BORDER_RADIUS,
    margin: 5,
    padding: 5,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
