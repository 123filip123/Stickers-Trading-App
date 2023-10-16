import { Input, ScrollView, Text, View } from "tamagui";
import { Logs } from "expo";
import { ActivityIndicator, StyleSheet } from "react-native";
import { BORDER_RADIUS, colors } from "../../globalConstants";
import { ICard } from "../../models/Card";
import {
  CARDS_TOGGLE_FILTER,
  CardsToggleGroupFilter,
} from "../../components/common/CardsToggleGroupFilter";
import { CardComponent } from "../../components/common/CardComponent";
import { useViewCollection } from "./useViewCollection";
import { SubmitButton } from "../../components/common/SubmitButton";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../AuthProvider";

interface IViewCollectionProps {
  route: any;
}

export const ViewCollection = ({ route }: IViewCollectionProps) => {
  Logs.enableExpoCliLogging();
  const { dispatch } = useAuth(); // Access the authentication state using useAuth

  const [
    cards,
    isLoading,
    searchValue,
    setSearchValue,
    cardsToggleFilter,
    setCardToggleFilter,
    addCard,
  ] = useViewCollection(route.params.collectionId);

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
  console.log(cards);
  const shouldRenderCard = (card: ICard) => {
    console.log(card);
    console.log("hm?");
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
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("BearerToken");
      dispatch({ type: "LOGOUT" });
      console.log("Access token removed");
    } catch (error) {
      console.error("Error removing access token:", error);
    }
  };

  return (
    <View backgroundColor="white" borderRadius={BORDER_RADIUS} padding={5}>
      <SubmitButton text="Log out" color={colors.red} onPress={handleLogout} />
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
      <ScrollView
        borderRadius={BORDER_RADIUS}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <View style={styles.gridContainer}>
          {cards.map((card) => {
            if (shouldRenderCard(card)) {
              return (
                <CardComponent
                  key={card.card_number}
                  card={card}
                  collectionName={route.params.collectionName}
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
