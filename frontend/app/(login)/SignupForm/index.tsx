import { Button, Input, Spinner, Text, View } from "tamagui";
import { Logs } from "expo";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import { BORDER_RADIUS, colors } from "../../globalConstants";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { axiosApi } from "../../network/Auth/config/config";
import { Endpoints } from "../../network/endpoints";
import * as yup from "yup";
import Toast from "react-native-toast-message";

interface ISignupFormProps {
  redirectToLogin: () => void;
}

interface IFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nickname: string;
}

const initialValues = {
  email: "",
  password: "",
  rePassword: "",
  firstName: "",
  lastName: "",
  nickname: "",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  nickname: yup
    .string()
    .min(3, "Nickname must be at least 3 characters")
    .required("Nickname is required"),
});

export const SignupForm = ({ redirectToLogin }: ISignupFormProps) => {
  Logs.enableExpoCliLogging();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signup = async (values: IFormValues) => {
    setIsSubmitting(true);
    const params = {
      email: values.email,
      first_name: values.firstName,
      last_name: values.lastName,
      nickname: values.nickname,
      password: values.password,
    };
    try {
      const api = await axiosApi();
      await api.post(Endpoints.signup, params);

      // Authenticate the user by dispatching the "LOGIN" action
      console.log("in");
      redirectToLogin();
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Sign up successful!",
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
      onSubmit={signup}
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
          <View style={styles.inputWrapper}>
            <View width="10%">
              <Icon name="lock" size={30} style={styles.icon} />
            </View>
            <View width="90%">
              <Input
                placeholder="Re-Password"
                value={values.rePassword}
                onChangeText={handleChange("rePassword")}
                onBlur={handleBlur("rePassword")}
                width="100%"
                secureTextEntry
              />
              {errors.rePassword && touched.rePassword && (
                <Text color={colors.red}>{errors.rePassword}</Text>
              )}
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <View width="10%">
              <Icon name="font" size={30} style={styles.icon} />
            </View>
            <View width="90%">
              <Input
                placeholder="First Name"
                value={values.firstName}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                width="100%"
              />
              {errors.firstName && touched.firstName && (
                <Text color={colors.red}>{errors.firstName}</Text>
              )}
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <View width="10%">
              <Icon name="bold" size={30} style={styles.icon} />
            </View>
            <View width="90%">
              <Input
                placeholder="Last Name"
                value={values.lastName}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                width="100%"
              />
              {errors.lastName && touched.lastName && (
                <Text color={colors.red}>{errors.lastName}</Text>
              )}
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <View width="10%">
              <Icon name="smile-o" size={30} style={styles.icon} />
            </View>
            <View width="90%">
              <Input
                placeholder="Nickname"
                value={values.nickname}
                onChangeText={handleChange("nickname")}
                onBlur={handleBlur("nickname")}
                width="100%"
              />
              {errors.nickname && touched.nickname && (
                <Text color={colors.red}>{errors.nickname}</Text>
              )}
            </View>
          </View>
          <Button
            size="$5"
            onPress={() => handleSubmit()}
            icon={isSubmitting ? () => <Spinner /> : undefined}
            backgroundColor={colors.blue}
            fontSize="$7"
            marginTop={20}
          >
            SIGN UP
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
