import { UseStorageOptions, useStorage } from './useStorage';

export function useSessionStorage<T>(
  key: string,
  defaultValue: T,
  options: UseStorageOptions = {}
) {
  return useStorage(key, defaultValue, { ...options, storage: window.sessionStorage });
}
