import { Text, View } from "tamagui";
import { Logs } from "expo";
import { StyleSheet } from "react-native";

interface IMyAccountScreenProps {}

export const MyAccountScreen = ({}: IMyAccountScreenProps) => {
  Logs.enableExpoCliLogging();

  return (
    <View>
      <Text>MyAccountScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
