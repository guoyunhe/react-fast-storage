import { StorageConfig } from './StorageConfig';
import { useStorage } from './useStorage';

export function useSessionStorage<T>(
  key: string,
  defaultValue: T,
  options?: Partial<StorageConfig>,
) {
  return useStorage(sessionStorage, key, defaultValue, options);
}
