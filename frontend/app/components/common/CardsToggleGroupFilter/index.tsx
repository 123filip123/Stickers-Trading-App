import { Text, View } from "tamagui";
import { Logs } from "expo";
import { StyleSheet } from "react-native";
import { BORDER_RADIUS, colors } from "../../../globalConstants";
import { TouchableOpacity } from "react-native-gesture-handler";

export enum CARDS_TOGGLE_FILTER {
  ALL = "All",
  OWNED = "Owned",
  MISSING = "Missing",
}

interface ICardsToggleGroupFilterProps {
  value: CARDS_TOGGLE_FILTER;
  setValue: (value: CARDS_TOGGLE_FILTER) => void;
}

export const CardsToggleGroupFilter = ({
  value,
  setValue,
}: ICardsToggleGroupFilterProps) => {
  Logs.enableExpoCliLogging();

  return (
    <View style={styles.toggleGroup}>
      <TouchableOpacity
        onPress={() => {
          setValue(CARDS_TOGGLE_FILTER.ALL);
        }}
      >
        <View
          style={styles.groupItem}
          backgroundColor={
            value === CARDS_TOGGLE_FILTER.ALL ? colors.gray : colors.white
          }
          borderTopLeftRadius={BORDER_RADIUS}
          borderBottomLeftRadius={BORDER_RADIUS}
        >
          <Text>{CARDS_TOGGLE_FILTER.ALL}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setValue(CARDS_TOGGLE_FILTER.OWNED);
        }}
      >
        <View
          style={styles.groupItem}
          backgroundColor={
            value === CARDS_TOGGLE_FILTER.OWNED ? colors.gray : colors.white
          }
        >
          <Text>{CARDS_TOGGLE_FILTER.OWNED}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setValue(CARDS_TOGGLE_FILTER.MISSING);
        }}
      >
        <View
          style={styles.groupItem}
          backgroundColor={
            value === CARDS_TOGGLE_FILTER.MISSING ? colors.gray : colors.white
          }
          borderTopRightRadius={BORDER_RADIUS}
          borderBottomRightRadius={BORDER_RADIUS}
        >
          <Text>{CARDS_TOGGLE_FILTER.MISSING}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleGroup: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: colors.white,
    flexDirection: "row",
    width: 300,
  },
  groupItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 35,
    borderColor: colors.gray,
    borderWidth: 1,
  },
});
