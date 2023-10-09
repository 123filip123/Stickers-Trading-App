import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import axios from "axios";
import { useState } from "react";
import { Logs } from "expo";

export default function TabOneScreen() {
  Logs.enableExpoCliLogging();
  const [some, setSome] = useState([]);

  const testFunction = async () => {
    console.log("start");
    try {
      console.log("try");
      const response = await axios.get(
        "http://192.168.100.8:3000/api/card_collections"
      );
      console.log(response.data);
      setSome(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One!!!!!!!</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button title="call" onPress={testFunction} />
      <Button title="reset state" onPress={() => setSome([])} />
      {some.map((element: any) => (
        <Text>{element.name}</Text>
      ))}
      <EditScreenInfo path="app/(tabs)/index.tsx" />
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
