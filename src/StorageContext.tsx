import { createContext } from 'react';

export interface StorageConfig {
  storage: Storage;
  serializer?: (data: any) => string;
  parser?: (raw: string) => any;
}

export const storageContextDefaultValue = {
  storage: localStorage,
  serializer: JSON.stringify,
  parser: JSON.parse,
};

export const StorageContext = createContext<StorageConfig>(storageContextDefaultValue);
