import { useEffect, useState } from "react";
import { ICardCollection } from "../../models/CardCollection";
import { axiosApi } from "../../network/Auth/config/config";
import { Endpoints } from "../../network/endpoints";

type TUseCollectionsScreenReturn = [ICardCollection[]];

export const useCollectionsScreen = () => {
  const [collections, setCollections] = useState<ICardCollection[]>([]);
  useEffect(() => {
    getMyCollections();
  }, []);

  const getMyCollections = async () => {
    try {
      const api = await axiosApi();
      const response = await api.get(Endpoints.getMyCollections);
      setCollections(response.data);
    } catch (error) {
    } finally {
    }
  };

  return [collections];
};
