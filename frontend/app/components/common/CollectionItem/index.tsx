import { Text, View, Image } from "tamagui";
import { Logs } from "expo";
import { Pressable, StyleSheet } from "react-native";
import { BORDER_RADIUS, colors } from "../../../globalConstants";
import { DeleteCollectionModal } from "../DeleteCollectionModal";

interface ICollectionItemProps {
  name: string;
  onPress: () => void;
  id: string;
  isEmpty?: boolean;
}

export const CollectionItem = ({
  name,
  onPress,
  id,
  isEmpty,
}: ICollectionItemProps) => {
  Logs.enableExpoCliLogging();

  if (isEmpty) {
    return (
      <View width="100%" marginBottom={10}>
        <View style={styles.container}>
          <Text style={styles.name}>
            Press the icon to add a new collection.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <View width="100%" marginBottom={10}>
        <View style={styles.container}>
          <Text style={styles.name}>{name}</Text>
          <DeleteCollectionModal collectionId={id} collectionName={name} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.gray,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: BORDER_RADIUS,
    height: 50,
  },
  image: {
    margin: 10,
    borderRadius: BORDER_RADIUS,
  },
  name: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
});
