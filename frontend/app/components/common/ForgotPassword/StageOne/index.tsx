import { View, Text, Input, Button, Spinner } from "tamagui";
import { Formik } from "formik";
import { initialValues, useForgotPassword, validationSchema } from "./utils";
import { colors } from "../../../../globalConstants";

interface IStageOne {
  setStage: React.Dispatch<React.SetStateAction<2 | 1 | 3>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const StageOne = ({ setStage, setEmail }: IStageOne) => {
  const [isSubmitting, handleSendResetCode] = useForgotPassword(
    setStage,
    setEmail
  );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSendResetCode}
    >
      {({
        handleChange,
        handleBlur,
        values,
        handleSubmit,
        errors,
        touched,
      }) => (
        <View>
          <View>
            <Text marginBottom={5}>Внеси е-пошта:</Text>
            <Input
              keyboardType="email-address"
              placeholder="Е-пошта"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              width="100%"
              autoCapitalize="none"
            />
            {errors.email && touched.email && (
              <Text color={colors.red}>{errors.email}</Text>
            )}
          </View>
          <Button
            size="$5"
            onPress={() => handleSubmit()}
            icon={isSubmitting ? () => <Spinner color="white" /> : undefined}
            backgroundColor={colors.blue}
            marginTop={20}
            color="white"
            disabled={isSubmitting}
          >
            Испрати код за ресетирање
          </Button>
        </View>
      )}
    </Formik>
  );
};
