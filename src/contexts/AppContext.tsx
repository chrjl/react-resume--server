import { createContext } from 'react';

export const AppContext = createContext<AppContextType>({
  source: 'url',
  format: 'json',
  path: '',
  raw: {},
});

export interface AppContextType {
  source: 'url' | 'file';
  path?: URL | string;
  format: 'json' | 'markdown';
  raw: object;
}
