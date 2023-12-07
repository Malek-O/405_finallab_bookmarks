import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout.tsx'
import { AuthProvider } from './context/AuthProvider';
import Signin from './pages/Signin.tsx'
import Signup from './pages/Signup.tsx'
import PersistLogin from './components/PersistLogin.tsx'
import MyBookmarks from './pages/MyBookmarks.tsx'
import RequireAuth from './components/RequireAuth.tsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PersistLogin />,
        children: [
          {
            index: true,
            path: "/",
            element: <Home />
          },
          {
            index: true,
            path: "/signin",
            element: <Signin />
          },
          {
            index: true,
            path: "/signup",
            element: <Signup />
          },
          {
            element: <RequireAuth />,
            children: [
              {
                path: "/mybookmarks",
                element: <MyBookmarks />
              },
            ]
          },
        ]
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
