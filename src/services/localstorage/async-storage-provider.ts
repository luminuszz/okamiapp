import { type StorageProvider } from ".";

import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageProvider implements StorageProvider {
  public async getItem<Value>(key: string): Promise<Value | null> {
    const value = await AsyncStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  }

  async setItem(key: string, value: any) {
    const parsedValue = JSON.stringify(value);

    await this.setItem(key, parsedValue);
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  }

  async multiSet(keyValuePairs: Array<[string, any]>) {
    await AsyncStorage.multiSet(keyValuePairs.map((value) => [value[0], JSON.stringify(value[1])]));
  }
}
