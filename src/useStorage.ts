import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { StorageConfig, StorageContext } from './StorageContext';

export type UseStorageOptions = Partial<StorageConfig>;

export function useStorage<T>(
  key: string,
  defaultValue: T,
  options: UseStorageOptions = {},
): [T, Dispatch<SetStateAction<T>>] {
  const config = useContext(StorageContext);

  const storage = options.storage || config.storage;
  const serializer = options.serializer || config.serializer;
  const parser = options.parser || config.parser;

  const rawRef = useRef<string | null>(null);
  const serializerRef = useRef(serializer);
  serializerRef.current = serializer;
  const parserRef = useRef(parser);
  parserRef.current = parser;
  const defaultValueRef = useRef(defaultValue);
  defaultValueRef.current = defaultValue;

  const [state, setState] = useState<T>(() => {
    // Use function for initialState can reduce I/O and increase performance.
    rawRef.current = storage.getItem(key);
    if (rawRef.current) {
      try {
        return parser(rawRef.current) as T;
      } catch (e) {
        return defaultValue;
      }
    }
    return defaultValue;
  });

  // Read storage and listen storage events
  useEffect(() => {
    const newValue = storage.getItem(key);
    if (rawRef.current !== newValue) {
      rawRef.current = newValue;
      setState(newValue ? parserRef.current(newValue) : defaultValueRef.current);
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key !== key || e.storageArea !== storage) return;

      if (e.newValue !== rawRef.current) {
        rawRef.current = e.newValue;
        setState(e.newValue ? parserRef.current(e.newValue) : defaultValueRef.current);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, storage]);

  // Write storage and trigger storage events
  useEffect(() => {
    const newValue = serializerRef.current(state);
    if (newValue !== rawRef.current) {
      const oldValue = rawRef.current;
      rawRef.current = newValue;
      window.localStorage.setItem(key, newValue);
      // Browser ONLY dispatch storage events to other tabs, NOT current tab.
      // We need to manually dispatch storage event for current tab when state changing.
      window.dispatchEvent(
        new StorageEvent('storage', {
          storageArea: storage,
          url: window.location.href,
          key,
          newValue,
          oldValue,
        }),
      );
    }
  }, [key, state, storage]);

  return [state, setState];
}
