import { useState } from "react";
import * as yup from "yup";
import { axiosApi } from "../../../../network/Auth/config/config";
import { Endpoints } from "../../../../network/endpoints";
import Toast from "react-native-toast-message";

type TUseForgotPasswordReturn = [
  boolean,
  (values: ISendResetCodeFormValues) => Promise<void>
];

export const useForgotPassword = (
  setStage: React.Dispatch<React.SetStateAction<2 | 1 | 3>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>
): TUseForgotPasswordReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSendResetCode = async (values: ISendResetCodeFormValues) => {
    setIsSubmitting(true);
    try {
      const api = await axiosApi();
      await api.post(Endpoints.forgotPassword, values);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Твојот код за ресетирање е испратен",
      });
      setEmail(values.email);
      setStage(2);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return [isSubmitting, handleSendResetCode];
};

export interface ISendResetCodeFormValues {
  email: string;
}

export const initialValues: ISendResetCodeFormValues = { email: "" };

export const validationSchema = yup.object().shape({
  email: yup.string().required("Е-пошта е потребна"),
});
