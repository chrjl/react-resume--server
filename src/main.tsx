import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// apply bootstrap classes, then perform generic reset
import 'bootstrap/dist/css/bootstrap.css';
import './styles/reset.css';
import './styles/index.css';

import Root from './routes/root';
import DataUploader, { action as dataUploaderAction } from './routes/source';
import SectionSelector from './routes/control'
import Raw, { loader as rawLoader } from './routes/raw';
import Status from './routes/status';
import Parsed, { loader as parsedLoader } from './routes/parsed';
import Template, { loader as templateLoader } from './routes/templates';

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
