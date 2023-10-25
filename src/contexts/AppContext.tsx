import { createContext } from 'react';
import { ResumeObject } from 'jsonresume-parser';

export const AppContext = createContext<AppContextType>({
  source: 'url',
  format: 'json',
  path: '',
  raw: {},
  resume: {},
});

export interface AppContextType {
  source: 'url' | 'file';
  path?: URL | string;
  format: 'json' | 'markdown';
  raw: object;
  resume: ResumeObject;
}
