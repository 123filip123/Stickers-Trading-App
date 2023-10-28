import { Text, View, Image } from "tamagui";
import { Logs } from "expo";
import { StyleSheet } from "react-native";
import { BORDER_RADIUS, colors } from "../../../globalConstants";
import Icon from "react-native-vector-icons/FontAwesome";

interface IViewCollectionDownloadInfoProps {}

export const ViewCollectionDownloadInfo =
  ({}: IViewCollectionDownloadInfoProps) => {
    Logs.enableExpoCliLogging();

    return (
      <View width="100%" marginBottom={10}>
        <View style={styles.container}>
          <Text style={styles.name}>Press the</Text>
          <View marginHorizontal={5}>
            <Icon name="download" size={20} />
          </View>
          <Text style={styles.name}>icon to download the collection info.</Text>
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
    fontSize: 16,
    color: "gray",
  },
});
