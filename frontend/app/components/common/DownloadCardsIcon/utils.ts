import { useState } from "react";
import { Endpoints } from "../../../network/endpoints";
import { BASE_PATH } from "../../../network/Auth/config/config";
import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const getTodaysDateString = () => {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const useDownloadCardsIconHook = (
  collectionName: string,
  collectionId: string
): TDownloadCardsIconHookReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadFromAPI = async () => {
    const filename = `${collectionName}(${getTodaysDateString()}).txt`;
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("BearerToken");
    const result = await FileSystem.downloadAsync(
      `${BASE_PATH}${Endpoints.downloadMyCollectionCardsTxt(collectionId)}`,
      FileSystem.documentDirectory + filename,
      {
        headers: {
          authorization: `Bearer ${token!}`,
        },
      }
    );
    console.log(result);
    await save(result.uri, filename, result.headers["Content-Type"]);
    setIsLoading(false);
  };

  const save = async (uri: string, filename: string, mimetype: string) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
            Toast.show({
              type: "success",
              text1: "Success",
              text2: "Your file is going to be downloaded soon!",
            });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  return [downloadFromAPI, isLoading];
};

type TDownloadCardsIconHookReturn = [() => Promise<void>, boolean];
