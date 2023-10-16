import { Formik } from "formik";
import React, { useState } from "react";
import { View, Input, Button, Spinner, Text } from "tamagui";
import * as SecureStore from "expo-secure-store";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as yup from "yup";
import { Logs } from "expo";
import Toast from "react-native-toast-message";
import { axiosApi } from "../../network/Auth/config/config";
import { Endpoints } from "../../network/endpoints";
import { BORDER_RADIUS, colors } from "../../globalConstants";
import { useAuth } from "../../AuthProvider";

interface IFormValues {
  email: string;
  password: string;
}

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

export const LoginForm = () => {
  Logs.enableExpoCliLogging();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dispatch } = useAuth(); // Access the authentication state using useAuth

  console.log("ozbilno tuka?");

  const login = async (values: IFormValues) => {
    setIsSubmitting(true);
    try {
      const api = await axiosApi();
      const response: any = await api.post(Endpoints.login, values);
      const accessToken = response.data.accessToken;
      await SecureStore.setItemAsync("BearerToken", accessToken);

      // Authenticate the user by dispatching the "LOGIN" action
      console.log("in");
      dispatch({ type: "LOGIN" });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Log in successful!",
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
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                width="100%"
              />
              {errors.email && touched.email && (
                <Text color={colors.red}>{errors.email}</Text>
              )}
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <View width="10%">
              <Icon name="lock" size={30} style={styles.icon} />
            </View>
            <View width="90%">
              <Input
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                width="100%"
                secureTextEntry
              />
              {errors.password && touched.password && (
                <Text color={colors.red}>{errors.password}</Text>
              )}
            </View>
          </View>
          <View width="100%" justifyContent="flex-end" flexDirection="row">
            <Text>Forgot password?</Text>
          </View>
          <Button
            size="$5"
            onPress={() => handleSubmit()}
            icon={isSubmitting ? () => <Spinner /> : undefined}
            backgroundColor={colors.blue}
            fontSize="$7"
            marginTop={20}
          >
            LOGIN
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
