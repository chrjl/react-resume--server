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
  control: {},
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
    component: React.ReactNode;
  }[];
  control: {
    [key: string]: {
      hidden?: boolean;
    };
  };
}
