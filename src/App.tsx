import { useState, useContext } from 'react';

import { AppContext, AppContextType } from './contexts/AppContext';
import AppBar from './components/AppBar';
import Document from './components/Document';
import DebugArea from './components/DebugArea';

import '@fontsource/arimo/latin-400.css';
import '@fontsource/arimo/latin-400-italic.css';
import '@fontsource/arimo/latin-700.css';
import '@fontsource/arimo/latin-700-italic.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/cousine/latin-400.css';
import '@fontsource/cousine/latin-400-italic.css';
import '@fontsource/cousine/latin-700.css';
import '@fontsource/cousine/latin-700-italic.css';

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
