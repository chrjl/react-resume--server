import { createContext, useContext, useReducer } from 'react';
import templates from '@reactresume/template';

interface MetaStateSource {
  type: 'remote' | 'file' | null;
  url?: string;
  fileName?: string;
}

interface MetaStateSection {
  id: string;
  visible: boolean;
}

interface MetaState {
  source: MetaStateSource;
  display: MetaStateSection[];
}

type Action = {
  type: 'UPDATE_SOURCE';
  source: { type: 'remote' | 'file'; url?: string; fileName?: string };
};

const templateSectionList = templates.map((s) => s.id);

const initialState: MetaState = {
  source: {
    type: null,
  },
  display: templateSectionList.map((s) => ({ id: s, visible: false })),
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
