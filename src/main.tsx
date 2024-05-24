import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// self-hosted fonts
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

// apply bootstrap classes, then perform generic reset
import 'bootstrap/dist/css/bootstrap.css';
import './styles/reset.css';
import './styles/index.css';

import Root from './routes/root';
import DataUploader, { action as dataUploaderAction } from './routes/source';
import SectionSelector, {
  action as sectionSelectorAction,
} from './routes/control';
import Raw, { loader as rawLoader } from './routes/raw';
import Status from './routes/status';
import Parsed, { loader as parsedLoader } from './routes/parsed';
import Template, { loader as templateLoader } from './routes/templates';
import Document from './routes/document';

import DataProvider, { useDataDispatch } from './contexts/DataContext';
import MetaProvider, { useMetaDispatch } from './contexts/MetaContext';

function App() {
  const dataDispatch = useDataDispatch();
  const metaDispatch = useMetaDispatch();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/source',
          element: <DataUploader />,
          action: dataUploaderAction({ metaDispatch, dataDispatch }),
        },
        {
          path: '/status',
          element: <Status />,
        },
        {
          path: '/control',
          element: <SectionSelector />,
          action: sectionSelectorAction({ metaDispatch }),
        },
        {
          path: '/raw',
          element: <Raw />,
        },
        {
          path: '/raw/:sectionId',
          element: <Raw />,
          loader: rawLoader,
        },
        {
          path: '/parsed/:sectionId',
          loader: parsedLoader,
          element: <Parsed />,
        },
        {
          path: '/templates/:sectionId',
          loader: templateLoader,
          element: <Template />,
        },
        {
          path: '/document',
          element: <Document />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MetaProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </MetaProvider>
  </React.StrictMode>
);
