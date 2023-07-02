# @guoyunhe/react-storage

## Install

```bash
npm i @guoyunhe/react-storage
```

## Usage

`useStorage()` takes three parameters:

- `key`: localStorage/sessionStorage key
- `defaultValue`: default value when there is no existing data from storage
- `options`: options for the hook, optional
  - `storage`: localStorage (default) or sessionStorage
  - `serializer`: function to serialize data, by default `JSON.stringify`
  - `serializer`: function to parse data, by default `JSON.parse`

```jsx
import { useStorage } from '@guoyunhe/react-storage';

function App() {
  const [settings, setSettings] = useStorage('token', { color: 'red', size: 20 });

  return <div>...</div>;
}
```

You can use options to change storage, serializer and parser.

```jsx
import { useStorage } from '@guoyunhe/react-storage';

function App() {
  const [date, setDate] = useStorage('token', new Date(), {
    storage: window.sessionStorage,
    serializer: (date) => date.toISOString(),
    parser: (str) => new Date(str),
  });

  return <div>...</div>;
}
```

You can also set global configuration with context:

```jsx
import { useStorage, StorageProvider } from '@guoyunhe/react-storage';

function App() {
  return (
    <StorageProvider storage={sessionStorage} serializer={ ... } parser={ ... }>
      <Page />
    </StorageProvider>
  );
}

function Page() {
  const [settings, setSettings] = useStorage('token', { color: 'red', size: 20 });
  return <div>...</div>;
}
```
