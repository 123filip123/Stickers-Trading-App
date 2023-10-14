import { Text, View } from "tamagui";
import { Logs } from "expo";
import {
  ActivityIndicator,
  DimensionValue,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { BORDER_RADIUS, colors } from "../../../globalConstants";

interface ISubmitButtonProps {
  text: string;
  onPress?: (event: GestureResponderEvent) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  width?: DimensionValue;
}

export const SubmitButton = ({
  text,
  isDisabled,
  isLoading,
  onPress,
  width,
}: ISubmitButtonProps) => {
  Logs.enableExpoCliLogging();
  const styles = generateStylesstyles(isDisabled);
  console.log(isDisabled);
  return (
    <TouchableOpacity style={styles.saveButton} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text fontSize="$7" fontWeight="bold" letterSpacing={2}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const generateStylesstyles = (isDisabled?: boolean, width?: DimensionValue) =>
  StyleSheet.create({
    saveButton: {
      borderRadius: BORDER_RADIUS,
      backgroundColor: colors.blue,
      opacity: isDisabled ? 1 : 0.2,
      height: 50,
      width: width ?? 100,
      justifyContent: "center",
      alignItems: "center",
    },
  });
