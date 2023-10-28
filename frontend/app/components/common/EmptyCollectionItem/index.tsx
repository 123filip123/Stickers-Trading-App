import { Text, View, Image } from "tamagui";
import { Logs } from "expo";
import { StyleSheet } from "react-native";
import { BORDER_RADIUS, colors } from "../../../globalConstants";
import Icon from "react-native-vector-icons/FontAwesome";

interface IEmptyCollectionItemProps {}

export const EmptyCollectionItem = ({}: IEmptyCollectionItemProps) => {
  Logs.enableExpoCliLogging();

  return (
    <View width="100%" marginBottom={10}>
      <View style={styles.container}>
        <Text style={styles.name}>Притиснете ја</Text>
        <View marginHorizontal={5}>
          <Icon name="plus" size={20} />
        </View>
        <Text style={styles.name}>иконата за да додадете нов албум.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.gray,
    width: "100%",
    alignItems: "center",
    borderTopRightRadius: BORDER_RADIUS,
    borderTopLeftRadius: BORDER_RADIUS,
    borderColor: "gray",
    borderBottomWidth: 1,
    padding: 10,
  },
  image: {
    margin: 10,
    borderRadius: BORDER_RADIUS,
  },
  name: {
    fontSize: 14,
    color: "gray",
  },
});
