import { Logs } from "expo";
import { useEffect, useState } from "react";
import { View } from "tamagui";
import { ICardCollection } from "../models/CardCollection";
import { axiosApi } from "../network/Auth/config/config";
import { Endpoints } from "../network/endpoints";
import { BORDER_RADIUS } from "../globalConstants";
import { CardCollectionItem } from "../components/common/CardCollectionItem";

const MyCollections = ({}) => {
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

  const pressHandler = () => {};

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
          onPress={pressHandler}
        />
      ))}
    </View>
  );
};
export default MyCollections;
