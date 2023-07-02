import { ReactNode } from 'react';
import { StorageConfig, StorageContext, storageContextDefaultValue } from './StorageContext';

export interface StorageProviderProps extends Partial<StorageConfig> {
  children?: ReactNode;
}

export function StorageProvider({
  children,
  storage = storageContextDefaultValue.storage,
  serializer = storageContextDefaultValue.serializer,
  parser = storageContextDefaultValue.parser,
}: StorageProviderProps) {
  return (
    <StorageContext.Provider value={{ storage, serializer, parser }}>
      {children}
    </StorageContext.Provider>
  );
}
