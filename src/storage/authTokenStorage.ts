import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "./config";

export async function saveAuthTokenToStorage(token: string) {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
  } catch (error) {
    throw error;
  }
}

export async function getAuthTokenFromStorage() {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
    return token;
  } catch (error) {
    throw error;
  }
}
