import { Text, View, Image } from "tamagui";
import { StyleSheet } from "react-native";
import { BORDER_RADIUS, colors } from "../../../globalConstants";
import { Link } from "expo-router";

export interface ICardCollectionItem {
  imageSrc: string;
  name: string;
  id: string;
}

export const CardCollectionItem = ({
  imageSrc,
  name,
  id,
}: ICardCollectionItem) => {
  return (
    <Link href={`/list/${id}`} asChild>
      <View width="100%" marginBottom={10}>
        <View style={styles.container}>
          <Image
            source={{ width: 80, height: 80, uri: imageSrc }}
            style={styles.image}
          />
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.gray,
    width: "100%",
    alignItems: "center",
    borderRadius: BORDER_RADIUS,
    height: 100,
  },
  image: {
    margin: 10,
    borderRadius: BORDER_RADIUS,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
