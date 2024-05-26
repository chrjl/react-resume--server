import { createContext, useContext, useReducer } from 'react';
import parser from '@reactresume/jsonresume-parser';
import { JSONResumeObject, ResumeObject } from '@reactresume/types';

interface Data {
  raw: JSONResumeObject;
  parsed: ResumeObject;
}

export type Action = { type: 'UPDATE'; raw: object };

function dataReducer(state: Data, action: Action) {
  switch (action.type) {
    case 'UPDATE': {
      const parsed = parser(action.raw);
      return { ...state, raw: action.raw, parsed };
    }
    default:
      throw new Error('Error at `dataReducer`, action type: ${action.type}');
  }
}

const DataContext = createContext(null as Data);
const DataDispatchContext = createContext(null as React.Dispatch<Action>);

interface DataProviderProps {
  children: React.ReactNode;
}

export default function DataProvider({ children }: DataProviderProps) {
  const [data, dispatch] = useReducer(dataReducer, {} as Data);

  return (
    <DataContext.Provider value={data}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}

export function useDataDispatch() {
  return useContext(DataDispatchContext);
}
