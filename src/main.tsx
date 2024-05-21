import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/reset.css';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Root from './routes/root';
import DataUploader, { action as dataUploaderAction } from './routes/source';
import Raw from './routes/raw';
import Status from './routes/status';
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
          path: '/raw',
          element: <Raw />,
        },
        {
          path: '/status',
          element: <Status />,
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
