import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles/reset.css';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Root from './routes/root';
import DataUploader, { action as dataUploaderAction } from './routes/source';
import Raw from './routes/raw';
import DataProvider, { useDataDispatch } from './contexts/DataContext';

function App() {
  const dataDispatch = useDataDispatch();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/source',
          element: <DataUploader />,
          action: dataUploaderAction(dataDispatch),
        },
        {
          path: '/raw',
          element: <Raw />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
