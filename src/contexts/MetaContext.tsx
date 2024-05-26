import { createContext, useContext, useReducer } from 'react';
import templates from '@reactresume/template';

interface MetaStateSource {
  type: 'remote' | 'file' | null;
  url?: string;
  fileName?: string;
}

interface MetaStateDisplay {
  id: string;
  visible: boolean;
  order?: number;
}

interface MetaState {
  source: MetaStateSource;
  display: MetaStateDisplay[];
}

type Action =
  | {
      type: 'UPDATE_SOURCE';
      source: MetaStateSource;
    }
  | { type: 'UPDATE_SECTIONS'; display: MetaStateDisplay[] };

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
        source: action.source,
      };
    }
    case 'UPDATE_SECTIONS': {
      return {
        ...metaState,
        display: action.display,
      };
    }
    default:
      throw new Error(
        `Error at \`metaReducer\`: I don't know how to handle action type ${action.type}`
      );
  }
}

const MetaContext = createContext(initialState);
const MetaDispatchContext = createContext(null as React.Dispatch<Action>);

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
