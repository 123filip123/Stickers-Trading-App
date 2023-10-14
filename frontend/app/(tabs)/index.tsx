import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import axios from "axios";
import { useEffect, useState } from "react";
import { Logs } from "expo";
import { Card } from "tamagui";
import { CardCollectionItem } from "../components/common/CardCollectionItem";
import { ICardCollection } from "../models/CardCollection";
import { axiosApi } from "../network/Auth/config/config";
import { Endpoints } from "../network/endpoints";
import { Link, Redirect } from "expo-router";

export default function TabOneScreen() {
  Logs.enableExpoCliLogging();
  const [some, setSome] = useState<ICardCollection[]>([]);

  useEffect(() => {
    testFunction();
  }, []);

  const testFunction = async () => {
    try {
      const api = await axiosApi();
      const response = await api.get(Endpoints.getMyCollections);
      setSome(response.data);
    } catch (error) {
    } finally {
    }
  };

  return <Redirect href="/home" />;

  return (
    <View>
      <Text style={styles.title}>Tab One!!!!!!!</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button title="call" onPress={testFunction} />
      <Button title="reset state" onPress={() => setSome([])} />
      {some.map((cardCollection: ICardCollection, i) => (
        <CardCollectionItem
          key={i}
          imageSrc={cardCollection.image}
          name={cardCollection.name}
          id={cardCollection._id}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
