import { Tabs, Text, View } from "tamagui";
import { LoginForm } from "./LoginForm";
import { StyleSheet } from "react-native";
import { BORDER_RADIUS } from "../globalConstants";

const login = () => {
  return (
    <View style={styles.container}>
      <Tabs defaultValue="login" flexDirection="column" width="100%">
        <Tabs.List width="100%">
          <Tabs.Tab value="login" style={styles.singleTab}>
            <Text>Login</Text>
          </Tabs.Tab>
          <Tabs.Tab value="sign-up" style={styles.singleTab}>
            <Text>Sign-up</Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="login">
          <LoginForm />
        </Tabs.Content>
      </Tabs>
    </View>
  );
};
export default login;

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 10,
    borderRadius: BORDER_RADIUS,
    flex: 1,
  },
  tabs: {},
  singleTab: {
    width: "50%",
  },
});
