import { Label, Switch, Text, View } from "tamagui";
import { Logs } from "expo";
import { StyleSheet } from "react-native";
import { colors } from "../../../globalConstants";

interface ISwitchFieldProps {
  value: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  leftLabel?: string;
  rightLabel?: string;
  isDisabled?: boolean;
}

export const SwitchField = ({
  value,
  onChange,
  leftLabel,
  rightLabel,
  isDisabled,
}: ISwitchFieldProps) => {
  Logs.enableExpoCliLogging();

  return (
    <View style={styles.container}>
      {leftLabel && <Label>{leftLabel}</Label>}
      <Switch
        backgroundColor={value ? colors.green : colors.gray}
        opacity={value ? 0.6 : 1}
        onCheckedChange={onChange}
        checked={value}
        marginHorizontal={5}
        disabled={isDisabled}
      >
        <Switch.Thumb
          animation="quick"
          backgroundColor={value ? colors.green : colors.red}
        />
      </Switch>
      {rightLabel && <Label>{rightLabel}</Label>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
