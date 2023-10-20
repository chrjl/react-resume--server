import { useState, useContext } from 'react';

import { AppContext, AppContextType } from './contexts/AppContext';
import AppBar from './components/AppBar';
import Document from './components/Document';

import './styles/App.css';

export default function App() {
  const [appContext, setAppContext] = useState<AppContextType>(
    useContext(AppContext)
  );

  const debug = `JSON.stringify(appContext):
${JSON.stringify(appContext, null, 2)}
  `;

  return (
    <AppContext.Provider value={appContext}>
      <div id="app-bar">
        <AppBar setAppContext={setAppContext} />
      </div>

      <div id="document">
        <Document />
      </div>

      <textarea
        id="debug-area"
        style={{ width: '100%' }}
        rows={20}
        value={debug}
        readOnly
      ></textarea>
    </AppContext.Provider>
  );
}
