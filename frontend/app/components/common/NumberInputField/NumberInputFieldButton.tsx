import { Logs } from "expo";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "tamagui";
import { colors } from "../../../globalConstants";

type TButtonSide = "left" | "right";

interface INumberInputFieldButtonProps {
  side: TButtonSide;
  onButtonPress: (value: string) => void;
  value: string;
  disabled?: boolean;
}

export const NumberInputFieldButton = ({
  side,
  onButtonPress,
  value,
  disabled,
}: INumberInputFieldButtonProps) => {
  Logs.enableExpoCliLogging();

  const specialCharacter = side === "left" ? "-" : "+";
  const isDisabled = disabled || (side === "left" && value === "0");
  const styles = generateStyles(side, isDisabled);

  const handleOnPress = () => {
    const numberVal =
      specialCharacter === "+" ? Number(value) + 1 : Number(value) - 1;
    onButtonPress(String(numberVal));
  };

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={handleOnPress}
      disabled={isDisabled}
    >
      <Text>{specialCharacter}</Text>
    </TouchableOpacity>
  );
};

const generateStyles = (side: TButtonSide, disabled: boolean) =>
  StyleSheet.create({
    buttonContainer: {
      width: 30,
      height: 30,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 75,
      backgroundColor: colors.yellow,
      marginRight: side === "left" ? 5 : 0,
      marginLeft: side === "right" ? 5 : 0,
      opacity: disabled ? 0.2 : 1,
    },
  });
