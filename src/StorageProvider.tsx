import { ReactNode } from 'react';
import { StorageConfig } from './StorageConfig';
import { StorageContext, storageContextDefaultValue } from './StorageContext';

export interface StorageProviderProps extends Partial<StorageConfig> {
  children?: ReactNode;
}

export function StorageProvider({
  children,
  serializer = storageContextDefaultValue.serializer,
  parser = storageContextDefaultValue.parser,
}: StorageProviderProps) {
  return (
    <StorageContext.Provider value={{ serializer, parser }}>{children}</StorageContext.Provider>
  );
}
