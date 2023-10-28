import { useEffect, useState } from "react";
import { ICardCollection } from "../../../models/CardCollection";
import { axiosApi } from "../../../network/Auth/config/config";
import { Endpoints } from "../../../network/endpoints";
import { useCollectionsContext } from "../../../context";

type TUseViewCollectionsReturn = [ICardCollection[]];

export const useViewCollections = (): TUseViewCollectionsReturn => {
  const { collections, getMyCollections } = useCollectionsContext();

  useEffect(() => {
    getMyCollections();
  }, []);

  return [collections];
};
