import React, { createContext } from 'react';
import { ResumeObject } from '@reactresume/types';

export const AppContext = createContext<AppContextType>({
  source: 'url',
  format: 'json',
  path: '',
  data: {
    jsonresume: {},
    parsed: {},
  },
  components: [],
});

export interface AppContextType {
  source: 'url' | 'file';
  path?: URL | string;
  format: 'json' | 'markdown';
  data: {
    jsonresume: object;
    parsed: ResumeObject;
  };
  components: {
    id: string;
    available?: boolean;
    hidden?: boolean;
    component: React.ReactNode;
  }[];
}
