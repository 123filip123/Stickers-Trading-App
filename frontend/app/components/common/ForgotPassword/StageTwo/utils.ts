import { useState } from "react";
import { axiosApi } from "../../../../network/Auth/config/config";
import { Endpoints } from "../../../../network/endpoints";
import Toast from "react-native-toast-message";

type TUseStageTwoReturn = [boolean, (values: any) => Promise<void>];

export interface ISendResetCodeFormValues {
  code: string;
}
export const initialValues: ISendResetCodeFormValues = { code: "" };

export const useStageTwo = (
  setStage: React.Dispatch<React.SetStateAction<2 | 1 | 3>>,
  email: string
): TUseStageTwoReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmitResetCode = async (values: ISendResetCodeFormValues) => {
    setIsSubmitting(true);
    try {
      const api = await axiosApi();
      await api.post(Endpoints.checkResetCode, { email, ...values });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Успешно поднесен код",
      });
      setStage(3);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Reset code not correct",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return [isSubmitting, handleSubmitResetCode];
};
