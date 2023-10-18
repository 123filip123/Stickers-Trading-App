import { Text, View } from "tamagui";
import { Logs } from "expo";
import {
  ActivityIndicator,
  ColorValue,
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
  color?: ColorValue;
}

export const SubmitButton = ({
  text,
  isDisabled,
  isLoading,
  onPress,
  color,
  width,
}: ISubmitButtonProps) => {
  Logs.enableExpoCliLogging();
  const styles = generateStylesstyles(isDisabled, color);
  return (
    <TouchableOpacity style={styles.saveButton} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text fontSize="$7" fontWeight="bold">
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const generateStylesstyles = (
  isDisabled?: boolean,
  color?: ColorValue,
  width?: DimensionValue
) =>
  StyleSheet.create({
    saveButton: {
      borderRadius: BORDER_RADIUS,
      backgroundColor: color ?? colors.blue,
      opacity: isDisabled ? 0.2 : 1,
      height: 50,
      width: width ?? 100,
      justifyContent: "center",
      alignItems: "center",
    },
  });
