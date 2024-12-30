# Changelog

## 2.0.0 - 2024-12-30

- **BREAKING CHANGE**: Removed `useStorage` export
- **BREAKING CHANGE**: Removed `StorageContext` export
- **BREAKING CHANGE**: Removed `storage` prop from `StorageProvider`
- **BREAKING CHANGE**: Removed `cjs` output
- **BREAKING CHANGE**: Changed build target from `es2015` to `es2017`
- Added `prefix` prop to `StorageProvider`

## 1.1.0 - 2023-09-16

- Added `useLocalStorage()` hook, same as `useStorage(key, defaultValue, { storage: localStorage })`
- Added `useSessionStorage()` hook, same as `useStorage(key, defaultValue, { storage: sessionStorage })`

## 1.0.0 - 2023-07-02

- Added `useStorage()` hook
- Added `<StorageProvider/>` component
