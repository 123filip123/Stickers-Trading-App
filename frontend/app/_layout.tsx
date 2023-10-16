import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../tamagui.config";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "./AuthProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./(login)";
import { CollectionsScreen } from "./screens/CollectionsScreen";
import { ViewCollection } from "./screens/ViewCollection";
import LogoSplashScreen from "./screens/SplashScreen";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <AuthProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <RootLayoutNav />
        <Toast />
      </TamaguiProvider>
    </AuthProvider>
  );
}
const Stack = createNativeStackNavigator();

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { state } = useAuth();

  console.log(state);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen
              name="SplashScreen"
              component={LogoSplashScreen}
              options={{ headerShown: false }}
            />
          ) : !state.isAuthenticated ? (
            <Stack.Screen name="Login" component={Login} />
          ) : (
            <>
              <Stack.Screen
                name="MyCollections"
                component={CollectionsScreen}
              />
              <Stack.Screen name="ViewCollection" component={ViewCollection} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
