import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Input, Label, Text, View } from "tamagui";
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

interface IAddCollectionFormValues {
  name: string;
  numberOfCards: string;
}

const initialValues: IAddCollectionFormValues = {
  name: "",
  numberOfCards: "",
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Името е потребно")
    .min(3, "Името мора да има барем 3 карактери."),
  numberOfCards: yup.string().required("Бројот на карти е потребен"),
});

interface IAddCollectionModalProps {
  isCollectionItem?: boolean;
}

export const AddCollectionModal = ({
  isCollectionItem,
}: IAddCollectionModalProps) => {
  Logs.enableExpoCliLogging();
  const [isModalOpen, setIsModalOpen, toggleModal] = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getMyCollections } = useCollectionsContext();

  const handleSave = async (values: IAddCollectionFormValues) => {
    setIsSubmitting(true);
    try {
      const numberOfCards = parseInt(values.numberOfCards, 10);

      if (isNaN(numberOfCards) || numberOfCards <= 0 || numberOfCards > 1000) {
        return;
      }
      const api = await axiosApi();
      const params = {
        name: values.name,
        number_of_cards: numberOfCards,
      };
      await api.post(Endpoints.postCollection, params);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Успешно додаден нов албум",
      });

      console.log(2);
      getMyCollections();
      toggleModal();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error creating collection",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <View marginRight={10} padding={5}>
          <Icon name="plus" size={25} />
        </View>
      </TouchableOpacity>
      <Modal
        visible={isModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalOpen(false)}
        style={{ borderRadius: BORDER_RADIUS }}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.container, shadowStyle]}>
            <View style={styles.cardContainer}>
              <View style={styles.exitHeader}>
                <Text fontWeight="bold" fontSize={18}>
                  Додади нов албум
                </Text>
                <View position="absolute" right={0}>
                  <TouchableOpacity onPress={toggleModal}>
                    <View padding={5}>
                      <Icon name="close" size={30} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View width="100%" height="100%">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSave}
                >
                  {({
                    handleChange,
                    handleBlur,
                    values,
                    handleSubmit,
                    errors,
                    touched,
                    setErrors,
                  }) => (
                    <View
                      width="100%"
                      height="100%"
                      backgroundColor={colors.gray}
                      padding={10}
                      borderRadius={BORDER_RADIUS}
                      justifyContent="flex-end"
                    >
                      <View style={styles.inputWrapper}>
                        <Text>Име:</Text>
                        <Input
                          placeholder="Име на албум"
                          value={values.name}
                          onChangeText={handleChange("name")}
                          onBlur={handleBlur("name")}
                          width="100%"
                        />
                        {errors.name && touched.name && (
                          <Text color={colors.red}>{errors.name}</Text>
                        )}
                      </View>
                      <View style={styles.inputWrapper}>
                        <Text>Број на сликички (макс: 1000):</Text>
                        <Input
                          placeholder="Број на сликички"
                          value={values.numberOfCards}
                          onChangeText={handleChange("numberOfCards")}
                          onBlur={handleBlur("numberOfCards")}
                          width="100%"
                          keyboardType="numeric"
                        />
                        {errors.numberOfCards && touched.numberOfCards && (
                          <Text color={colors.red}>{errors.numberOfCards}</Text>
                        )}
                      </View>
                      <View width="100%" alignItems="flex-end">
                        <SubmitButton
                          text="Зачувај"
                          onPress={() => handleSubmit()}
                          isLoading={isSubmitting}
                          isDisabled={isSubmitting}
                        />
                      </View>
                    </View>
                  )}
                </Formik>
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
    height: 300,
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
  collectionItem: {
    flexDirection: "row",
    backgroundColor: colors.gray,
    width: "100%",
    alignItems: "center",
    borderRadius: BORDER_RADIUS,
    padding: 10,
  },
  name: {
    fontSize: 16,
    color: "gray",
  },
});
