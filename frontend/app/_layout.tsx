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
import { CollectionsScreen } from "./screens/CollectionsScreen";
import LogoSplashScreen from "./screens/SplashScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MyAccountScreen } from "./screens/MyAccountScreen";
import { CustomDrawerContent } from "./components/common/CustomDrawerContent";
import { AddCollectionModal } from "./components/common/AddCollectionModal";
import { CollectionsProvider } from "./context";
import { ForgotPassword } from "./components/common/ForgotPassword";
import LoginScreen from "./screens/LoginScreen";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

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
  const Drawer = createDrawerNavigator();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <CollectionsProvider>
        <NavigationContainer independent={true}>
          {state.isLoading ? (
            <Stack.Navigator>
              <Stack.Screen
                name="SplashScreen"
                component={LogoSplashScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : !state.isAuthenticated ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ title: "Заборави лозинка" }}
              />
            </Stack.Navigator>
          ) : (
            <Drawer.Navigator drawerContent={CustomDrawerContent}>
              <Drawer.Screen
                name="MyCollections"
                component={CollectionsScreen}
                options={({ navigation }) => ({
                  title: "Албуми",
                  headerRight: () => <AddCollectionModal />,
                })}
              />
              {/* <Drawer.Screen name="ViewCollection" component={ViewCollection} /> */}
              <Drawer.Screen
                name="MyAccount"
                component={MyAccountScreen}
                options={{ title: "Промени лозинка" }}
              />
            </Drawer.Navigator>
          )}
        </NavigationContainer>
      </CollectionsProvider>
    </ThemeProvider>
  );
}
