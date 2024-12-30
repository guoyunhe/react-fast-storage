import { createContext } from 'react';
import { StorageConfig } from './StorageConfig';

export const StorageContext = createContext<StorageConfig>({
  serializer: JSON.stringify,
  parser: JSON.parse,
  prefix: '',
});
