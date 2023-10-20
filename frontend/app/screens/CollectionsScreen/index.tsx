import { Text, View } from "tamagui";
import { Logs } from "expo";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { CollectionItem } from "../../components/common/CollectionItem";
import { ICardCollection } from "../../models/CardCollection";
import { BORDER_RADIUS } from "../../globalConstants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ViewCollection } from "../ViewCollection";
import { ViewCollections } from "../../components/common/ViewCollections";

const CollectionsScreenStack = createNativeStackNavigator();

export const CollectionsScreen = () => {
  return (
    <CollectionsScreenStack.Navigator>
      <CollectionsScreenStack.Screen
        name="ViewCollections"
        component={ViewCollections}
        options={{ headerShown: false }}
      />
      <CollectionsScreenStack.Screen
        name="ViewCollection"
        component={ViewCollection}
      />
    </CollectionsScreenStack.Navigator>
  );
};

const styles = StyleSheet.create({});
