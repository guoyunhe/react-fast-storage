import { StorageConfig } from './StorageConfig';
import { useStorage } from './useStorage';

export function useLocalStorage<T>(key: string, defaultValue: T, options?: Partial<StorageConfig>) {
  return useStorage(localStorage, key, defaultValue, options);
}
