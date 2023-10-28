import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ICardCollection } from "./models/CardCollection";
import { axiosApi } from "./network/Auth/config/config";
import { Endpoints } from "./network/endpoints";

interface CollectionsContextType {
  collections: ICardCollection[];
  updateCollections: (newCollections: ICardCollection[]) => void;
  getMyCollections: () => Promise<void>;
}

const CollectionsContext = createContext<CollectionsContextType>({
  collections: [],
  updateCollections: () => {
    throw new Error("updateCollections function not provided");
  },
  getMyCollections: async () => {
    throw new Error("getMyCollections function not provided");
  },
});

export const useCollectionsContext = () => {
  return useContext(CollectionsContext);
};
interface CollectionsProviderProps {
  children: ReactNode;
}
export const CollectionsProvider: React.FC<CollectionsProviderProps> = ({
  children,
}: CollectionsProviderProps) => {
  const [collections, setCollections] = useState<ICardCollection[]>([]);

  const updateCollections = (newCollections: ICardCollection[]) => {
    setCollections(newCollections);
  };

  const getMyCollections = async () => {
    try {
      const api = await axiosApi();
      const response = await api.get(Endpoints.getMyCollections);
      setCollections(response.data);
    } catch (error) {
      // Handle errors
    }
  };

  useEffect(() => {
    getMyCollections();
  }, []);

  return (
    <CollectionsContext.Provider
      value={{ collections, updateCollections, getMyCollections }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
