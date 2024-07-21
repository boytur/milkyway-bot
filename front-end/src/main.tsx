import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Dashboard from './pages/Dashboard';
import Work from './pages/Work';
import Layout from './Layout';
import { PageSettingProvider } from './contexts/pageSettingContext';
import('preline')

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: '/work', element: <Work /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PageSettingProvider>
      <RouterProvider router={router} />
    </PageSettingProvider>
  </React.StrictMode>
);