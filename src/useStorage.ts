import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { StorageConfig } from './StorageConfig';
import { StorageContext } from './StorageContext';

export function useStorage<T>(
  storage: Storage,
  key: string,
  defaultValue: T,
  options?: Partial<StorageConfig>,
): [T, Dispatch<SetStateAction<T>>] {
  const config = useContext(StorageContext);

  const serializer = options?.serializer || config.serializer;
  const parser = options?.parser || config.parser;
  const prefix = options?.prefix ?? config.prefix;

  const fullKey = prefix + key;

  const rawRef = useRef<string | null>(null);
  const serializerRef = useRef(serializer);
  serializerRef.current = serializer;
  const parserRef = useRef(parser);
  parserRef.current = parser;
  const defaultValueRef = useRef(defaultValue);
  defaultValueRef.current = defaultValue;

  const [state, setState] = useState<T>(() => {
    // Use function for initialState can reduce I/O and increase performance.
    rawRef.current = storage.getItem(fullKey);
    if (rawRef.current) {
      try {
        return parser(rawRef.current) as T;
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  });

  // Read storage and listen storage events
  useEffect(() => {
    const newValue = storage.getItem(fullKey);
    if (rawRef.current !== newValue) {
      rawRef.current = newValue;
      setState(newValue ? parserRef.current(newValue) : defaultValueRef.current);
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key !== fullKey || e.storageArea !== storage) return;

      if (e.newValue !== rawRef.current) {
        rawRef.current = e.newValue;
        setState(e.newValue ? parserRef.current(e.newValue) : defaultValueRef.current);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [fullKey, storage]);

  // Write storage and trigger storage events
  useEffect(() => {
    const newValue = serializerRef.current(state);
    if (newValue !== rawRef.current) {
      const oldValue = rawRef.current;
      rawRef.current = newValue;
      try {
        // Writing data may fail when storage is full or prevented by browser
        // In this case, useStorage behaves like useState without persisting any data
        storage.setItem(fullKey, newValue);
      } catch (e) {
        console.error('[react-fast-fetch]: failed to write data into storage');
        console.error(e);
      }
      // Browser ONLY dispatch storage events to other tabs, NOT current tab.
      // We need to manually dispatch storage event for current tab when state changing.
      window.dispatchEvent(
        new StorageEvent('storage', {
          storageArea: storage,
          url: window.location.href,
          key: fullKey,
          newValue,
          oldValue,
        }),
      );
    }
  }, [fullKey, state, storage]);

  return [state, setState];
}
