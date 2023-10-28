import { useState } from "react";
import * as yup from "yup";
import { axiosApi } from "../../../../network/Auth/config/config";
import { Endpoints } from "../../../../network/endpoints";
import Toast from "react-native-toast-message";

interface IChangePasswordFormValues {
  password: string;
  confirmPassword: string;
}

export const initialValues: IChangePasswordFormValues = {
  password: "",
  confirmPassword: "",
};

export const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Лозинка е потребна")
    .min(8, "Лозинката мора да биде барем 8 карактери долга")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      "Лозинката мора да содржи барем една буква и бројка"
    ),
  confirmPassword: yup
    .string()
    .required("Потврди лозинка е потребно")
    .oneOf([yup.ref("password")], "Лозинките мора да се исти"),
});

type TUseStageThreeReturn = [
  boolean,
  (values: IChangePasswordFormValues) => Promise<void>
];

export const useStageThree = (
  email: string,
  navigation: any
): TUseStageThreeReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changePassword = async (values: IChangePasswordFormValues) => {
    setIsSubmitting(true);
    const params = {
      email,
      password: values.password,
    };
    try {
      const api = await axiosApi();
      await api.put(Endpoints.resetPassword, params);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Успешно променета лозинка",
      });
      navigation.navigate("Login");
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

  return [isSubmitting, changePassword];
};
