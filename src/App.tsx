import { useState, useContext } from 'react';

import { AppContext, AppContextType } from './contexts/AppContext';
import AppBar from './components/AppBar';
import Document from './components/Document';
import DebugArea from './components/DebugArea';

import './styles/App.css';

export default function App() {
  const [appContext, setAppContext] = useState<AppContextType>(
    useContext(AppContext)
  );

  return (
    <AppContext.Provider value={appContext}>
      <div id="app-bar">
        <AppBar setAppContext={setAppContext} />
      </div>

      <div id="document">
        <Document />
      </div>
    </AppContext.Provider>
  );
}
