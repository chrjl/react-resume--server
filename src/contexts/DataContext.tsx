import { createContext, useContext, useReducer } from 'react';

interface Data {
  raw: object;
}

type Action = { type: 'UPDATE'; raw: object };

function dataReducer(state: Data, action: Action) {
  switch (action.type) {
    case 'UPDATE': {
      return { ...state, raw: action.raw };
    }
    default:
      throw new Error('Error at `dataReducer`, action type: ${action.type}');
  }
}

const DataContext = createContext(null);
const DataDispatchContext = createContext(null);

interface DataProviderProps {
  children: React.ReactNode;
}

export default function DataProvider({ children }: DataProviderProps) {
  const [data, dispatch] = useReducer(dataReducer, {});

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
