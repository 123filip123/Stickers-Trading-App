import { View, Text, Input, Button, Spinner } from "tamagui";
import { Formik } from "formik";
import { initialValues, useStageTwo } from "./utils";
import { Logs } from "expo";
import { StyleSheet } from "react-native";
import { colors } from "../../../../globalConstants";

interface IStageTwoProps {
  setStage: React.Dispatch<React.SetStateAction<2 | 1 | 3>>;
  email: string;
}

export const StageTwo = ({ setStage, email }: IStageTwoProps) => {
  Logs.enableExpoCliLogging();
  const [isSubmitting, handleSubmitResetCode] = useStageTwo(setStage, email);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmitResetCode}>
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
            <Text marginBottom={5}>Внеси го кодот:</Text>
            <Input
              keyboardType="numeric"
              placeholder="Reset code"
              value={values.code}
              onChangeText={handleChange("code")}
              onBlur={handleBlur("code")}
              width="100%"
            />
            {errors.code && touched.code && (
              <Text color={colors.red}>{errors.code}</Text>
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
            Поднеси го кодот
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({});
