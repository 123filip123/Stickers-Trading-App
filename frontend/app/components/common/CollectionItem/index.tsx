import { Text, View, Image } from "tamagui";
import { Logs } from "expo";
import { Pressable, StyleSheet } from "react-native";
import { BORDER_RADIUS, colors } from "../../../globalConstants";

interface ICollectionItemProps {
  imageSrc: string;
  name: string;
  id: string;
  onPress: () => void;
}

export const CollectionItem = ({
  imageSrc,
  name,
  id,
  onPress,
}: ICollectionItemProps) => {
  Logs.enableExpoCliLogging();

  return (
    <Pressable onPress={onPress}>
      <View width="100%" marginBottom={10}>
        <View style={styles.container}>
          <Image
            source={{ width: 80, height: 80, uri: imageSrc }}
            style={styles.image}
          />
          <Text style={styles.name}>{name}</Text>
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
