import { createContext, useContext, useReducer } from 'react';

interface MetaState {
  source: {
    type: 'remote' | 'file' | null;
    url?: string;
    fileName?: string;
  };
}

type Action = {
  type: 'UPDATE_SOURCE';
  source: { type: 'remote' | 'file'; url?: string; fileName?: string };
};

const initialState: MetaState = {
  source: {
    type: null,
  },
};

function metaReducer(metaState: MetaState, action: Action) {
  switch (action.type) {
    case 'UPDATE_SOURCE': {
      return {
        ...metaState,
        source: { ...action.source },
      };
      break;
    }
    default:
      throw new Error(
        `Error at \`metaReducer\`: I don't know how to handle action type ${action.type}`
      );
  }
}

const MetaContext = createContext(initialState);
const MetaDispatchContext = createContext(null);

export default function MetaProvider({ children }) {
  const [state, dispatch] = useReducer(metaReducer, initialState);

  return (
    <MetaContext.Provider value={state}>
      <MetaDispatchContext.Provider value={dispatch}>
        {children}
      </MetaDispatchContext.Provider>
    </MetaContext.Provider>
  );
}

export function useMeta() {
  return useContext(MetaContext);
}

export function useMetaDispatch() {
  return useContext(MetaDispatchContext);
}
