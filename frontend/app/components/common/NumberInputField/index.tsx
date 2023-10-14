import { useState } from "react";
import { Animated } from "react-native";
import { Input, SizeTokens, View } from "tamagui";
import { NumberInputFieldButton } from "./NumberInputFieldButton";
import { StyleSheet } from "react-native";
import { Logs } from "expo";

interface INumberInputFieldProps {
  onButtonPress: React.Dispatch<React.SetStateAction<string>>;
  inputSize?: SizeTokens;
  inputWidth?: number | SizeTokens | Animated.AnimatedNode;
  inputHeight?: number | SizeTokens | Animated.AnimatedNode;
  value?: string;
  isDisabled?: boolean;
}

export const NumberInputField = ({
  inputSize,
  inputWidth,
  inputHeight,
  value = "0",
  isDisabled,
  onButtonPress,
}: INumberInputFieldProps) => {
  Logs.enableExpoCliLogging();

  const [inputValue, setInputValue] = useState(value);
  console.log("++++", inputValue);
  const handleInputChange = (text: string) => {
    // Remove any leading zeros
    console.log("big mistake");
    text = text.replace(/^0+/, "");

    // Remove any non-numeric characters
    text = text.replace(/[^0-9]/g, "");
    console.log("mistake", text);
    setInputValue(text);
  };

  const handleButtonPress = (value: string) => {
    onButtonPress(value);
    setInputValue(value);
  };

  return (
    <View style={styles.container}>
      <NumberInputFieldButton
        side="left"
        onButtonPress={handleButtonPress}
        value={inputValue}
        disabled={isDisabled}
      />
      <Input
        size={inputSize}
        width={75}
        height={inputHeight}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={handleInputChange}
        editable={false}
      />
      <NumberInputFieldButton
        side="right"
        onButtonPress={handleButtonPress}
        value={inputValue}
        disabled={isDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
