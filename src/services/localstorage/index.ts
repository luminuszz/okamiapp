import { AsyncStorageProvider } from "./async-storage-provider";

export interface StorageProvider {
  setItem: (key: string, value: string) => Promise<void>;
  getItem: <Value>(key: string) => Promise<Value | null>;
  removeItem: (key: string) => Promise<void>;
  multiSet: (keyValuePairs: Array<[string, any]>) => Promise<void>;
}

const storageKeys = {
  token: "@okami:token",
  email: "@okami:email",
} as const;

type StorageKeys = keyof typeof storageKeys;

class StorageService {
  constructor(private readonly storage: StorageProvider) {}

  public async get<Value>(key: StorageKeys): Promise<Value | null> {
    return await this.storage.getItem(key);
  }

  public async set(key: StorageKeys, value: string) {
    await this.storage.setItem(key, value);
  }

  public async remove(key: StorageKeys) {
    await this.storage.removeItem(key);
  }

  public async multiSet(keyValuePairs: Array<[StorageKeys, any]>) {
    await this.storage.multiSet(keyValuePairs);
  }
}

export const storageService = new StorageService(new AsyncStorageProvider());
