import { ReactNode } from 'react';
import { StorageConfig } from './StorageConfig';
import { StorageContext } from './StorageContext';

export interface StorageProviderProps extends Partial<StorageConfig> {
  children?: ReactNode;
}

export function StorageProvider({
  children,
  serializer = JSON.stringify,
  parser = JSON.parse,
  prefix = '',
}: StorageProviderProps) {
  return (
    <StorageContext.Provider value={{ serializer, parser, prefix }}>
      {children}
    </StorageContext.Provider>
  );
}
