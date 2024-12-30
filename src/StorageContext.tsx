import { createContext } from 'react';
import { StorageConfig } from './StorageConfig';

export const storageContextDefaultValue = {
  serializer: JSON.stringify,
  parser: JSON.parse,
};

export const StorageContext = createContext<StorageConfig>(storageContextDefaultValue);
