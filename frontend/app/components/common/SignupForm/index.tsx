import { Button, Input, Spinner, Text, View } from "tamagui";
import { Logs } from "expo";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import Icon from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import { BORDER_RADIUS, colors } from "../../../globalConstants";
import { axiosApi } from "../../../network/Auth/config/config";
import { Endpoints } from "../../../network/endpoints";

interface ISignupFormProps {
  redirectToLogin: () => void;
}

interface IFormValues {
  email: string;
  password: string;
  username: string;
}

const initialValues = {
  email: "",
  password: "",
  rePassword: "",
  username: "",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Е-пошта е потребна")
    .email("Погрешен формат на е-пошта"),
  password: yup
    .string()
    .required("Лозинка е потребна")
    .min(8, "Лозинката мора да биде барен 8 карактери долга")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      "Лозинката мора да има барем една буква и бројка"
    ),
  rePassword: yup
    .string()
    .required("Потврди лозинка е потребно")
    .oneOf([yup.ref("password")], "Лозинките мора да се исти"),
  username: yup
    .string()
    .min(3, "Корисничкото име мора да биде барем 3 карактери долго")
    .required("Корисничко име е потребно"),
});

export const SignupForm = ({ redirectToLogin }: ISignupFormProps) => {
  Logs.enableExpoCliLogging();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signup = async (values: IFormValues) => {
    setIsSubmitting(true);
    const params = {
      email: values.email,
      username: values.username,
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
        text2: "Успешна регистрација",
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
              <Icon name="smile-o" size={30} style={styles.icon} />
            </View>
            <View width="90%">
              <Input
                placeholder="Корисничко име"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                width="100%"
              />
              {errors.username && touched.username && (
                <Text color={colors.red}>{errors.username}</Text>
              )}
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <View width="10%">
              <Icon name="user" size={30} style={styles.icon} />
            </View>
            <View width="90%">
              <Input
                placeholder="Е-пошта"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                width="100%"
                autoCapitalize="none"
                keyboardType="email-address"
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
                placeholder="Лозинка"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                width="100%"
                secureTextEntry
                autoCapitalize="none"
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
                placeholder="Потврди лозинка"
                value={values.rePassword}
                onChangeText={handleChange("rePassword")}
                onBlur={handleBlur("rePassword")}
                width="100%"
                secureTextEntry
                autoCapitalize="none"
              />
              {errors.rePassword && touched.rePassword && (
                <Text color={colors.red}>{errors.rePassword}</Text>
              )}
            </View>
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
            Регистрирај се
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
