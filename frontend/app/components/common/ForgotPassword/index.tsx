import { View } from "tamagui";
import { BORDER_RADIUS } from "../../../globalConstants";
import { useForgotPasswordStages } from "./utils";
import { StageOne } from "./StageOne";
import { StageTwo } from "./StageTwo";
import { StageThree } from "./StageThree";

export const ForgotPassword = ({ navigation }: any) => {
  const [stage, setStage, email, setEmail] = useForgotPasswordStages();
  return (
    <View
      backgroundColor="white"
      borderRadius={BORDER_RADIUS}
      padding={10}
      height="100%"
      margin={5}
    >
      {stage === 1 && <StageOne setStage={setStage} setEmail={setEmail} />}
      {stage === 2 && <StageTwo setStage={setStage} email={email} />}
      {stage === 3 && <StageThree email={email} navigation={navigation} />}
    </View>
  );
};
