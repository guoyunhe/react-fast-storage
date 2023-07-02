# @guoyunhe/react-storage

## Install

```bash
npm i @guoyunhe/react-storage
```

## Usage

By default, `useStorage()` store serialized JSON data into `localStorage`.

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
