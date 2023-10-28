import { useState } from "react";

type TUseForgotPasswordStagesReturn = [
  1 | 2 | 3,
  React.Dispatch<React.SetStateAction<1 | 2 | 3>>,
  string,
  React.Dispatch<React.SetStateAction<string>>
];

export const useForgotPasswordStages = (): TUseForgotPasswordStagesReturn => {
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  return [stage, setStage, email, setEmail];
};
