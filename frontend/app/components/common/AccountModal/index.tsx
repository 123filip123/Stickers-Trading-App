import { Button, Text, View } from "tamagui";
import { Logs } from "expo";
import { Modal, Platform, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BORDER_RADIUS, colors } from "../../../globalConstants";
import { useState } from "react";
import { SubmitButton } from "../SubmitButton";
import { useAuth } from "../../../AuthProvider";
import * as SecureStore from "expo-secure-store";

interface IAccountModalProps {}

export const AccountModal = ({}: IAccountModalProps) => {
  Logs.enableExpoCliLogging();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    <TouchableOpacity onPress={() => setIsAccountModalOpen(true)}>
      <Icon name="user" size={30} color={colors.blue} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAccountModalOpen}
        onRequestClose={() => setIsAccountModalOpen(false)}
      >
        <View flex={1} justifyContent="center" alignItems="center">
          <View style={[styles.modalContainer, shadowStyle]}>
            <View></View>
            <View
              alignItems="center"
              justifyContent="center"
              borderTopColor={colors.gray}
              borderTopWidth={2}
              paddingTop={10}
            >
              <SubmitButton
                text="Log out"
                color={colors.red}
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                onPress={handleLogout}
              />
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const shadowStyle = Platform.select({
  ios: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  android: {
    elevation: 4,
  },
});

const styles = StyleSheet.create({
  modalContainer: {
    width: "80%",
    height: "50%",
    borderRadius: BORDER_RADIUS,
    backgroundColor: colors.white,
    padding: 10,
    justifyContent: "flex-end",
  },
});
