import { Text, View } from "tamagui";
import { Logs } from "expo";
import { StyleSheet } from "react-native";
import { BORDER_RADIUS } from "../../../globalConstants";

interface ITagComponentProps {
  text: string;
  color: string;
}

export const TagComponent = ({ text, color }: ITagComponentProps) => {
  Logs.enableExpoCliLogging();

  return (
    <View style={styles.container} backgroundColor={color}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS,
  },
  text: {
    marginHorizontal: 10,
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
