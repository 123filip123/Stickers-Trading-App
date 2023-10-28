import React, { useState } from "react";
import { Modal, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Input, Label, Text, View } from "tamagui";
import { ICard } from "../../../models/Card";
import { BORDER_RADIUS, colors } from "../../../globalConstants";
import Icon from "react-native-vector-icons/FontAwesome";
import { NumberInputField } from "../NumberInputField";
import { Logs } from "expo";
import { SwitchField } from "../SwitchField";
import { TagComponent } from "../TagComponent";
import { Endpoints } from "../../../network/endpoints";
import { axiosApi } from "../../../network/Auth/config/config";
import { SubmitButton } from "../SubmitButton";
import { useModal } from "../../../hooks/useModal";
import { Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import { useCollectionsContext } from "../../../context";

interface IDeleteCollectionModal {
  collectionId: string;
  collectionName: string;
}

export const DeleteCollectionModal = ({
  collectionId,
  collectionName,
}: IDeleteCollectionModal) => {
  Logs.enableExpoCliLogging();
  const [isModalOpen, setIsModalOpen, toggleModal] = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getMyCollections } = useCollectionsContext();

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const api = await axiosApi();
      console.log(1);
      await api.delete(Endpoints.deleteMyCollection(collectionId));
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Successfully deleted collection",
      });

      getMyCollections();
      toggleModal();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error deleting collection",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <View marginRight={10} padding={5}>
          <Icon name="trash" color={colors.red} size={25} />
        </View>
      </TouchableOpacity>
      <Modal
        visible={isModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.container, shadowStyle]}>
            <View style={styles.cardContainer}>
              <View style={styles.exitHeader}>
                <Text fontWeight="bold" fontSize={18}>
                  Избриши албум
                </Text>
                <View position="absolute" right={0}>
                  <TouchableOpacity onPress={toggleModal}>
                    <View padding={5}>
                      <Icon name="close" size={30} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                width="100%"
                height={115}
                backgroundColor="white"
                borderRadius={BORDER_RADIUS}
                marginTop={20}
                padding={10}
              >
                <Text>
                  Дали сте сигурни дека сакате да го избришете {collectionName}?
                </Text>
                <View
                  justifyContent="flex-end"
                  flexDirection="row"
                  marginTop={20}
                >
                  <Button onPress={toggleModal} disabled={isSubmitting}>
                    Откажи
                  </Button>
                  <Button
                    marginLeft={10}
                    backgroundColor={colors.red}
                    onPress={handleDelete}
                    disabled={isSubmitting}
                  >
                    Избриши
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
    // height: "40%",
  },
  cardContainer: {
    width: "100%",
    height: 160,
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  exitHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  inputWrapper: {
    marginBottom: 20,
  },
});
