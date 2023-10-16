import { Stack } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../globalConstants";
import { useState } from "react";
import { AccountModal } from "../components/common/AccountModal";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "My Collections",
          headerRight: () => <AccountModal />,
        }}
      />
    </Stack>
  );
};
export default HomeLayout;
