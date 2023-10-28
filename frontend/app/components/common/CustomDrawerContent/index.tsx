import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { View, Text } from "tamagui";
import { SubmitButton } from "../SubmitButton";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../../../AuthProvider";
import { colors } from "../../../globalConstants";

export const CustomDrawerContent = (props: any) => {
  const { dispatch } = useAuth(); // Access the authentication state using useAuth

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("BearerToken");
      dispatch({ type: "LOGOUT" });
      console.log("Access token removed");
    } catch (error) {
      console.error("Error removing access token:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/* Custom header with your logo */}
        <View
          style={{
            //   height: 150,
            //   backgroundColor: "lightblue",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Add your logo component here */}
          <Image
            source={require("../../../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
        {/* Standard Drawer Items */}
        <DrawerItemList {...props} />
        {/* Custom footer with a button */}
      </DrawerContentScrollView>
      <View style={styles.logoutButtonContainer}>
        <SubmitButton
          text="Одјави се"
          color={colors.red}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
  },
  logoutButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
