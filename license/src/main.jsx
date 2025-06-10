import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { ClerkProvider, SignUp } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './Pages/Dashboard/dashboard';
import Settings from './Pages/Settings/settings';
import Login from './Pages/Login/login';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/user',
    element: <Settings />,
  },
  {
    path: '/',
    element: <Homepage />,
  }
]);

const clerk_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerk_key) {
  throw new Error('VITE_CLERK_KEY is not defined. Please set it in your environment variables.');
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider defaultColorScheme='dark'>
        <ClerkProvider publishableKey={clerk_key}>
          <Notifications />
            <RouterProvider router={router} />
        </ClerkProvider>
    </MantineProvider>
  </StrictMode>,
)