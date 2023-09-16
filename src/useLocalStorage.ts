import { UseStorageOptions, useStorage } from './useStorage';

export function useLocalStorage<T>(key: string, defaultValue: T, options: UseStorageOptions = {}) {
  return useStorage(key, defaultValue, { ...options, storage: window.localStorage });
}
