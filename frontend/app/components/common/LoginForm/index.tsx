import { Formik } from "formik";
import React, { useState } from "react";
import { View, Input, Button, Spinner, Text } from "tamagui";
import * as SecureStore from "expo-secure-store";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as yup from "yup";
import { Logs } from "expo";
import Toast from "react-native-toast-message";
import { useAuth } from "../../../AuthProvider";
import { axiosApi } from "../../../network/Auth/config/config";
import { Endpoints } from "../../../network/endpoints";
import { BORDER_RADIUS, colors } from "../../../globalConstants";

interface IFormValues {
  emailOrUsername: string;
  password: string;
}

const initialValues = {
  emailOrUsername: "",
  password: "",
};

const validationSchema = yup.object().shape({
  emailOrUsername: yup
    .string()
    .required("Е-пошта или корисничко име е потребно"),
  password: yup.string().required("Лозинка е потребна"),
});

export const LoginForm = ({ navigation }: any) => {
  Logs.enableExpoCliLogging();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dispatch } = useAuth();
  const login = async (values: IFormValues) => {
    setIsSubmitting(true);
    try {
      const api = await axiosApi();
      const response: any = await api.post(Endpoints.login, values);
      const accessToken = response.data.accessToken;
      await SecureStore.setItemAsync("BearerToken", accessToken);

      dispatch({ type: "LOGIN" });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Успешна најава",
      });
    } catch (e: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: e.response.data.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={login}
    >
      {({
        handleChange,
        handleBlur,
        values,
        handleSubmit,
        errors,
        touched,
      }) => (
        <View
          marginVertical={20}
          width="100%"
          backgroundColor={colors.gray}
          padding={10}
          borderRadius={BORDER_RADIUS}
        >
          <View style={styles.inputWrapper}>
            <View width="10%">
              <Icon name="user" size={30} style={styles.icon} />
            </View>
            <View width="90%">
              <Input
                placeholder="Е-пошта или корисничко име"
                value={values.emailOrUsername}
                onChangeText={handleChange("emailOrUsername")}
                onBlur={handleBlur("emailOrUsername")}
                width="100%"
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.emailOrUsername && touched.emailOrUsername && (
                <Text color={colors.red}>{errors.emailOrUsername}</Text>
              )}
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <View width="10%">
              <Icon name="lock" size={30} style={styles.icon} />
            </View>
            <View width="90%">
              <Input
                placeholder="Лозинка"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                width="100%"
                autoCapitalize="none"
                secureTextEntry
              />
              {errors.password && touched.password && (
                <Text color={colors.red}>{errors.password}</Text>
              )}
            </View>
          </View>
          <View width="100%" justifyContent="flex-end" flexDirection="row">
            <TouchableOpacity onPress={handleForgotPasswordPress}>
              <Text>Ја заборави лозинката?</Text>
            </TouchableOpacity>
          </View>
          <Button
            size="$5"
            onPress={() => handleSubmit()}
            icon={isSubmitting ? () => <Spinner color="white" /> : undefined}
            backgroundColor={colors.blue}
            fontSize="$7"
            marginTop={20}
            color="white"
          >
            Најави се
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    // width: "100%",
  },
  icon: {
    color: colors.blue,
  },
});
