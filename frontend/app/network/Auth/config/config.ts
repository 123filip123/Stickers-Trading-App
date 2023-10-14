import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const BASE_PATH = "http://192.168.100.8:3000/api";

export const axiosApi = async () => {
  const token = await SecureStore.getItemAsync("BearerToken");
  const api = axios.create({
    baseURL: BASE_PATH,
  });
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
  return api;
};
