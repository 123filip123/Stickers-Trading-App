import { Logs } from "expo";
import { useViewCollections } from "./useCollectionsScreen";
import { ICardCollection } from "../../../models/CardCollection";
import { CollectionItem } from "../CollectionItem";
import { View } from "tamagui";
import { BORDER_RADIUS } from "../../../globalConstants";
import { FlatList } from "react-native";
import { EmptyCollectionItem } from "../EmptyCollectionItem";

export const ViewCollections = ({ navigation }: any) => {
  Logs.enableExpoCliLogging();
  const [cardCollections] = useViewCollections();

  const renderCardCollectionItem = ({ item }: { item: ICardCollection }) => {
    const pressHandler = () =>
      navigation.navigate("ViewCollection", {
        collectionName: item.name,
        collectionId: item._id,
        numberOfCards: item.number_of_cards,
      });

    return (
      <CollectionItem name={item.name} id={item._id} onPress={pressHandler} />
    );
  };

  return (
    <View
      backgroundColor="white"
      borderRadius={BORDER_RADIUS}
      height="100%"
      margin={5}
    >
      <EmptyCollectionItem />
      <View paddingHorizontal={10}>
        <FlatList
          data={cardCollections}
          keyExtractor={(item) => item._id}
          renderItem={renderCardCollectionItem}
          numColumns={1}
        />
      </View>
    </View>
  );
};
