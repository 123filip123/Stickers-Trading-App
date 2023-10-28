import { Button, Input, Spinner, Text, View } from "tamagui";
import { Logs } from "expo";
import { StyleSheet } from "react-native";
import { Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import Icon from "react-native-vector-icons/FontAwesome";
import { BORDER_RADIUS, colors } from "../../globalConstants";
import { useState } from "react";
import { axiosApi } from "../../network/Auth/config/config";
import { Endpoints } from "../../network/endpoints";
import Toast from "react-native-toast-message";

interface IMyAccountScreenProps {}

interface IChangePasswordFormValues {
  password: string;
  confirmPassword: string;
}

const initialValues: IChangePasswordFormValues = {
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Лозинка е потребна")
    .min(8, "Лозинката мора да биде барем 8 карактери долга")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      "Лозинката мора да содржи барем еден буква и бројка"
    ),
  confirmPassword: yup
    .string()
    .required("Потврди лозинка е потребно")
    .oneOf([yup.ref("password")], "Лозинките мора да се исти"),
});

export const MyAccountScreen = ({}: IMyAccountScreenProps) => {
  Logs.enableExpoCliLogging();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changePassword = async (values: IChangePasswordFormValues) => {
    setIsSubmitting(true);
    const params = {
      password: values.password,
    };
    try {
      const api = await axiosApi();
      await api.put(Endpoints.changePassword, params);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Successfully changed password",
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
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={changePassword}
      >
        {({
          handleChange,
          handleBlur,
          values,
          handleSubmit,
          errors,
          touched,
        }) => (
          <View style={styles.formWrapper}>
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
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  width="100%"
                  secureTextEntry
                  autoCapitalize="none"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text color={colors.red}>{errors.confirmPassword}</Text>
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
              Промени лозинка
            </Button>
          </View>
        )}
      </Formik>
    </View>
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
  formWrapper: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS,
  },
});
