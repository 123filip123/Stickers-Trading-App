import React from "react";
import { Modal, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Label, Text, View } from "tamagui";
import { ICard } from "../../../models/Card";
import { BORDER_RADIUS, colors } from "../../../globalConstants";
import Icon from "react-native-vector-icons/FontAwesome"; // You can use any icon library of your choice
import { NumberInputField } from "../NumberInputField";
import { Logs } from "expo";
import { SwitchField } from "../SwitchField";
import { useCardModalFormHook } from "./useCardModalFormHook";
import { TagComponent } from "../TagComponent";
import { Endpoints } from "../../../network/endpoints";
import { axiosApi } from "../../../network/Auth/config/config";
import { SubmitButton } from "../SubmitButton";
import Toast from "react-native-toast-message";

interface ICardModalProps {
  isVisible: boolean;
  closeModal: () => void;
  card: ICard;
  collectionName: string;
  addCard: (newCard: ICard) => void;
}

export const CardModal = ({
  isVisible,
  card,
  closeModal,
  addCard,
}: ICardModalProps) => {
  Logs.enableExpoCliLogging();

  const [
    duplicatesStateValue,
    isCardOwnedStateValue,
    setDuplicatesStateValue,
    setIsCardOwnedStateValue,
    isFormChanged,
    isSaving,
    setIsSaving,
  ] = useCardModalFormHook(card, card.owned);

  const styles = generateStyles(isCardOwnedStateValue, isFormChanged);

  const isDuplicatesDisabled = !isCardOwnedStateValue;

  const handleSavePress = async () => {
    setIsSaving(true);
    // If the card is initialy owned, we need to delete if placed as missing, or update for duplicate changes

    try {
      const api = await axiosApi();
      const body = {
        owned: isCardOwnedStateValue,
        duplicates: Number(duplicatesStateValue),
      };
      const response = await api.put(Endpoints.updateCard(card._id), body);
      addCard(response.data);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Успешно зачувана сликичка!",
      });
      closeModal();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error updating card",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const tagComponentText = isSaving ? "SAVING ..." : "НЕ Е ЗАЧУВАНО";

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
      style={{ borderRadius: BORDER_RADIUS }}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.container, shadowStyle]}>
          <View style={styles.cardContainer}>
            <View style={styles.exitHeader}>
              {isFormChanged && (
                <TagComponent text={tagComponentText} color={colors.orange} />
              )}
              <View position="absolute" right={0}>
                <TouchableOpacity onPress={closeModal}>
                  <View padding={5}>
                    <Icon name="close" size={30} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.numberContainer}>
              <View style={styles.numberBorder}>
                <Text style={styles.numberText}>{card.card_number}</Text>
              </View>
            </View>
            <SwitchField
              value={isCardOwnedStateValue}
              onChange={setIsCardOwnedStateValue}
              leftLabel="Недостасува"
              rightLabel="Сопственост"
            />
            <View
              flexDirection="row"
              width="100%"
              alignItems="flex-end"
              justifyContent="space-between"
            >
              <View style={styles.duplicatesContainer}>
                <Label>Дупликати</Label>
                <NumberInputField
                  inputSize="$4"
                  value={duplicatesStateValue}
                  onButtonPress={setDuplicatesStateValue}
                  isDisabled={isDuplicatesDisabled || isSaving}
                />
              </View>
              <SubmitButton
                text="Зачувај"
                onPress={handleSavePress}
                isLoading={isSaving}
                isDisabled={!isFormChanged}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
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

const generateStyles = (isOwned?: boolean, changesMade?: boolean) =>
  StyleSheet.create({
    modalContainer: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: BORDER_RADIUS,
      backgroundColor: colors.gray,
      width: "80%",
      height: "50%",
    },
    cardContainer: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    exitHeader: {
      width: "100%",
      height: "10%",
      flexDirection: "row",
      justifyContent: "center",
    },
    numberContainer: {
      width: "100%",
      height: "40%",
      justifyContent: "center",
      alignItems: "center",
    },
    numberBorder: {
      width: 150,
      height: 150,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 75,
      borderColor: isOwned ? colors.green : colors.red,
      borderWidth: 5,
      backgroundColor: colors.white,
    },
    numberText: {
      fontSize: 70,
      fontWeight: "bold",
    },
    duplicatesContainer: {
      justifyContent: "flex-end",
      flexDirection: "column",
      alignItems: "center",
      width: "50%",
    },
    ownedSwitchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });
