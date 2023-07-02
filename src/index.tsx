import { ReactNode } from 'react';

export interface ReactStorageProps {
  children: ReactNode;
}

export function ReactStorage({ children }: ReactStorageProps) {
  return <div className="ReactStorage">{children}</div>;
}
