import { Logs } from "expo";
import { Stack } from "expo-router";

const LoginLayout = () => {
  Logs.enableExpoCliLogging();

  console.log("1");
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};
export default LoginLayout;
