import { Tabs, Text, View } from "tamagui";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { BORDER_RADIUS } from "../globalConstants";
import { LoginForm } from "../components/pages/Login/LoginForm";
import { Logs } from "expo";
import { SignupForm } from "./SignupForm";
import { useState } from "react";

const Login = () => {
  Logs.enableExpoCliLogging();
  console.log(3);
  const [selectedTab, setSelectedTab] = useState<"login" | "sign-up">("login");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        enabled
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />
          <Tabs value={selectedTab} flexDirection="column" width="100%">
            <Tabs.List width="100%">
              <Tabs.Tab
                value="login"
                style={styles.singleTab}
                onPress={() => {
                  setSelectedTab("login");
                }}
              >
                <Text>Login</Text>
              </Tabs.Tab>
              <Tabs.Tab
                value="sign-up"
                style={styles.singleTab}
                onPress={() => {
                  setSelectedTab("sign-up");
                }}
              >
                <Text>Sign-up</Text>
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Content value="login">
              <LoginForm />
            </Tabs.Content>
            <Tabs.Content value="sign-up">
              <SignupForm
                redirectToLogin={() => {
                  setSelectedTab("login");
                }}
              />
            </Tabs.Content>
          </Tabs>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default Login;

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
  logo: {
    height: 100,
    width: 100,
    marginBottom: 50,
  },
  singleTab: {
    width: "50%",
  },
});
