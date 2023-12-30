import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "./config";

export type StorageAuthTokenProps = {
  token: string; 
  refresh_token: string;
}

export async function saveAuthTokenToStorage({ token, refresh_token }: StorageAuthTokenProps) {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token, refresh_token }));
  } catch (error) {
    throw error;
  }
}

export async function getAuthTokenFromStorage() {
  try {
    const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

    const { token, refresh_token }: StorageAuthTokenProps = response ? JSON.parse(response) : {};

    return {
      token,
      refresh_token,
    };
  } catch (error) {
    throw error;
  }
}

export async function removeTokenFromStorage() { 
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
  } catch (error) {
    throw error;
  }
}
