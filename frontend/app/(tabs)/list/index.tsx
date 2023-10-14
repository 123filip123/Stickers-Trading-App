import { Logs } from "expo";
import { useEffect, useState } from "react";
import { View } from "tamagui";
import { ICardCollection } from "../../models/CardCollection";
import { Endpoints } from "../../network/endpoints";
import { axiosApi } from "../../network/Auth/config/config";
import { CardCollectionItem } from "../../components/common/CardCollectionItem";
import { BORDER_RADIUS } from "../../globalConstants";

const list = () => {
  Logs.enableExpoCliLogging();
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
  return (
    <View
      backgroundColor="white"
      borderRadius={BORDER_RADIUS}
      padding={10}
      height="100%"
    >
      {collections.map((cardCollection: ICardCollection, i) => (
        <CardCollectionItem
          imageSrc={cardCollection.image}
          name={cardCollection.name}
          id={cardCollection._id}
          key={i}
        />
      ))}
    </View>
  );
};
export default list;
