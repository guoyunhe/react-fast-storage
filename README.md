# @guoyunhe/react-storage

![npm](https://img.shields.io/npm/v/@guoyunhe/react-storage)
![downloads](https://img.shields.io/npm/dw/@guoyunhe/react-storage)
![minzipped size](https://img.shields.io/bundlephobia/minzip/@guoyunhe/react-storage)

Better useLocalStorage() and useSessionStorage() hooks.

## Installation

```bash
npm install --save @guoyunhe/react-storage
```

## Examples

### Simple

By default, useLocalStorage support JSON data.

```js
import { useLocalStorage, useSessionStorage } from '@guoyunhe/react-storage';

interface Settings {
  color: string;
  size: number;
}

function App() {
  const [settings, setSettings] = useLocalStorage<Settings>('settings', { color: 'red', size: 20 });
  const [draft, setDraft] = useSessionStorage<string>('draft', '');
}
```

### Customize serializer and parser

You can use options to customize serializer and parser.

```js
import { useLocalStorage } from '@guoyunhe/react-storage';

function App() {
  const [date, setDate] = useLocalStorage('date', new Date(), {
    serializer: (date) => date.toISOString(),
    parser: (str) => new Date(str),
  });
}
```

### Storage key prefix

LocalStorage is scoped by domain. However, you may have multiple React apps under same domain and
don't want to share data between. In this case, you can specify a global `prefix` with
`<StorageProvider/>`.

```js
import { useLocalStorage, StorageProvider } from '@guoyunhe/react-storage';

function App() {
  return (
    <StorageProvider prefix="dashboard_">
      <Page />
    </StorageProvider>
  );
}

function Page() {
  // The actual storage key will be `dashboard_dark_mode`
  const [darkMode, setDarkMode] = useLocalStorage('dark_mode', false);
}
```

## API

### useLocalStorage(key, defaultValue, options)

`useLocalStorage()` can not only persist data, but also share state between browser tabs!

Remember that localStorage has a 5MB size limit. Do NOT write too many data into it.

#### key

Type: `string`

Storage key. If [`prefix`](#prefix) is defined, actual storage key is `prefix` + `key`.

#### defaultValue

Type: `T`

Default value to use when storage doesn't exist or can not be parsed.

#### options.serializer

Type: `(value: T) => string`

Default: `JSON.stringify`

Serialize value to string.

#### options.parser

Type: `(data: string) => T`

Default: `JSON.parse`

Parse string to value.

#### options.prefix

Type: `string`

In case you defined global `prefix` in `<StorageProvider/>`, but need to override it in some places.

### useSessionStorage()

API is the same as `useLocalStorage()`, but store data in `sessionStorage`, which will be clear after
closing browser tabs. It is useful when you want an easy way to:

- Share state between different React components or apps in the same browser tab
- Remember state after refreshing browser tab

Remember that sessionStorage also has a 5MB size limit. Do NOT write too many data into it.

### StorageProvider

Define global configuration for hooks.

#### prefix

Type: `string`

If `prefix` is defined, actual storage key is `prefix` + `key`.

#### serializer

Type: `(value: T) => string`

Default: `JSON.stringify`

Serialize value to string.

#### parser

Type: `(data: string) => T`

Default: `JSON.parse`

Parse string to value.

## Comparison

| Package                   | TS  | ESM | Prefix | Sync across tabs | Sync across components | Bundle size                                                                        |
| ------------------------- | --- | --- | ------ | ---------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| @guoyunhe/react-storage   | ✅  | ✅  | ✅     | ✅               | ✅                     | ![Bundle size](https://img.shields.io/bundlephobia/minzip/@guoyunhe/react-storage) |
| [use-local-storage-state] | ✅  | ✅  | ❌     | ✅               | ❌                     | ![Bundle size](https://img.shields.io/bundlephobia/minzip/use-local-storage-state) |
| [use-local-storage]       | ✅  | ❌  | ❌     | ✅               | ✅                     | ![Bundle size](https://img.shields.io/bundlephobia/minzip/use-local-storage)       |
| [react-storage-hooks]     | ✅  | ❌  | ❌     | ✅               | ❌                     | ![Bundle size](https://img.shields.io/bundlephobia/minzip/react-storage-hooks)     |
| [react-use]               | ✅  | ✅  | ❌     | ❌               | ❌                     | ![Bundle size](https://img.shields.io/bundlephobia/minzip/react-use)               |
| [ahooks]                  | ✅  | ✅  | ❌     | ❌               | ❌                     | ![Bundle size](https://img.shields.io/bundlephobia/minzip/ahooks)                  |

[react-storage-hooks]: https://www.npmjs.com/package/react-storage-hooks
[use-local-storage-state]: https://www.npmjs.com/package/use-local-storage-state
[use-local-storage]: https://www.npmjs.com/package/use-local-storage
[react-use]: https://www.npmjs.com/package/react-use
[ahooks]: https://www.npmjs.com/package/ahooks
