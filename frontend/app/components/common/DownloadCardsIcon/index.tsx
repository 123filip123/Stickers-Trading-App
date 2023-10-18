import { Logs } from "expo";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDownloadCardsIconHook } from "./utils";
import { colors } from "../../../globalConstants";

interface IDownloadCardsIconProps {
  collectionId: string;
  collectionName: string;
}

export const DownloadCardsIcon = ({
  collectionId,
  collectionName,
}: IDownloadCardsIconProps) => {
  Logs.enableExpoCliLogging();

  const [downloadFromAPI, isLoading] = useDownloadCardsIconHook(
    collectionName,
    collectionId
  );

  return (
    <TouchableOpacity onPress={downloadFromAPI}>
      <Icon
        name="download"
        size={25}
        onPress={downloadFromAPI}
        disabled={isLoading}
        color={isLoading ? colors.gray : "black"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
