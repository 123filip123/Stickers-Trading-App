import { useState } from "react";
import { ICard } from "../../../models/Card";

type TCardModalFormHook = [
  string,
  boolean,
  React.Dispatch<React.SetStateAction<string>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  boolean,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];

export const useCardModalFormHook = (
  card: ICard,
  isCardOwnedInitial: boolean
): TCardModalFormHook => {
  const [duplicatesStateValue, setDuplicatesStateValue] = useState(
    card.duplicates.toString()
  );
  const [isCardOwnedStateValue, setIsCardOwnedStateValue] =
    useState(isCardOwnedInitial);

  const [isSaving, setIsSaving] = useState(false);

  const isFormChanged =
    duplicatesStateValue !== card.duplicates.toString() ||
    isCardOwnedStateValue !== isCardOwnedInitial;

  return [
    duplicatesStateValue,
    isCardOwnedStateValue,
    setDuplicatesStateValue,
    setIsCardOwnedStateValue,
    isFormChanged,
    isSaving,
    setIsSaving,
  ];
};
