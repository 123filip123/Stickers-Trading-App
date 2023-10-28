import { Button, Input, Spinner, Text, View } from "tamagui";
import { Logs } from "expo";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import { colors } from "../../../../globalConstants";
import { initialValues, useStageThree, validationSchema } from "./utils";

interface IStageThreeProps {
  email: string;
  navigation: any;
}

export const StageThree = ({ email, navigation }: IStageThreeProps) => {
  Logs.enableExpoCliLogging();
  const [isSubmitting, changePassword] = useStageThree(email, navigation);

  return (
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
        <View>
          <View>
            <Text marginBottom={5}>Нова лозинка:</Text>
            <Input
              placeholder="Нова лозинка"
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
          <View>
            <Text marginBottom={5}>Потврди лозинка:</Text>
            <Input
              placeholder="Потврди лозинка"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              width="100%"
              autoCapitalize="none"
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text color={colors.red}>{errors.confirmPassword}</Text>
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
            Промени лозинка
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({});
