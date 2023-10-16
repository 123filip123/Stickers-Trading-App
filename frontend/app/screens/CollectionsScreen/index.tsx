import { Text, View } from "tamagui";
import { Logs } from "expo";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { CollectionItem } from "../../components/common/CollectionItem";
import { useCollectionsScreen } from "./useCollectionsScreen";
import { ICardCollection } from "../../models/CardCollection";
import { BORDER_RADIUS } from "../../globalConstants";

interface ICollectionsScreenProps {}

export const CollectionsScreen = ({ navigation }: any) => {
  Logs.enableExpoCliLogging();
  const [cardCollections] = useCollectionsScreen();

  const renderCardCollectionItem = ({ item }: { item: ICardCollection }) => {
    const pressHandler = () =>
      navigation.navigate("ViewCollection", {
        collectionName: item.name,
        collectionId: item._id,
        numberOfCards: item.number_of_cards,
      });

    return (
      <CollectionItem
        imageSrc={item.image}
        name={item.name}
        id={item._id}
        onPress={pressHandler}
      />
    );
  };

  return (
    <View
      backgroundColor="white"
      borderRadius={BORDER_RADIUS}
      padding={10}
      height="100%"
    >
      <FlatList
        data={cardCollections}
        keyExtractor={(item) => item._id}
        renderItem={renderCardCollectionItem}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
