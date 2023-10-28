import { useState } from "react";

type TUseModalReturn = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  () => void
];

export const useModal = (initialState?: boolean): TUseModalReturn => {
  const [isOpen, setIsOpen] = useState(initialState ?? false);

  const toggleModal = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return [isOpen, setIsOpen, toggleModal];
};
