import { Input, ScrollView, View } from "tamagui";
import { Logs } from "expo";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { BORDER_RADIUS, colors } from "../../globalConstants";
import { ICard } from "../../models/Card";
import {
  CARDS_TOGGLE_FILTER,
  CardsToggleGroupFilter,
} from "../../components/common/CardsToggleGroupFilter";
import { useViewCollection } from "./useViewCollection";
import { DownloadCardsIcon } from "../../components/common/DownloadCardsIcon";
import { ViewCollectionDownloadInfo } from "../../components/common/ViewCollectionDownloadInfo";
import Icon from "react-native-vector-icons/FontAwesome";
import CardComponent from "../../components/common/CardComponent";

interface IViewCollectionProps {
  route: any;
  navigation: any;
}

export const ViewCollection = ({ route, navigation }: IViewCollectionProps) => {
  Logs.enableExpoCliLogging();
  const { collectionName, collectionId, numberOfCards } = route.params;

  navigation.setOptions({
    title: collectionName,
    headerRight: () => (
      <DownloadCardsIcon
        collectionId={collectionId as string}
        collectionName={collectionName as string}
      />
    ),
  });

  const [
    cards,
    isLoading,
    searchValue,
    setSearchValue,
    cardsToggleFilter,
    setCardToggleFilter,
    addCard,
  ] = useViewCollection(collectionId);

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
        if (card.owned) {
          return (
            searchValue === "" || String(card.card_number).includes(searchValue)
          );
        } else return false;
      }
      case CARDS_TOGGLE_FILTER.MISSING: {
        if (!card.owned) {
          return (
            searchValue === "" || String(card.card_number).includes(searchValue)
          );
        } else return false;
      }
      case CARDS_TOGGLE_FILTER.DUPLICATES: {
        if (card.duplicates > 0) {
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

  const cardsToRender = cards.filter((card) => shouldRenderCard(card));

  const renderItem = ({ item }: { item: ICard }) => (
    <CardComponent
      key={item.card_number}
      card={item}
      collectionName={route.params.collectionName}
      addCard={addCard}
    />
  );

  return (
    <View backgroundColor="white" borderRadius={BORDER_RADIUS} margin={5}>
      {/* <ViewCollectionDownloadInfo /> */}
      <View padding={5}>
        <View
          width="100%"
          justifyContent="center"
          alignItems="center"
          margin={5}
        >
          <CardsToggleGroupFilter
            value={cardsToggleFilter}
            setValue={setToggleGroupValue}
          />
        </View>
        <View
          margin={5}
          padding={5}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderRadius={BORDER_RADIUS}
          backgroundColor={colors.gray}
        >
          <View margin={5} marginRight={10}>
            <Icon name="search" size={20} color="gray" />
          </View>
          <TextInput
            placeholder="Search"
            keyboardType="numeric"
            onChangeText={setSearchValue}
            style={{ flex: 1 }}
          />
        </View>
        <ScrollView
          borderRadius={BORDER_RADIUS}
          contentContainerStyle={{ paddingBottom: 200 }}
        >
          <View style={styles.gridContainer}>
            {cardsToRender.map((card) => (
              <CardComponent
                key={card.card_number}
                card={card}
                collectionName={route.params.collectionName}
                addCard={addCard}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    backgroundColor: colors.gray,
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: BORDER_RADIUS,
    margin: 5,
    padding: 5,
    // paddingBottom: 200,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
