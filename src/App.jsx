import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Link from './pages/Link'
import RedirectLink from './pages/RedirectLink'
import URLprovider from './Context'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children:[
      {
        path: "/",
        element: <Landing />
      },
      {
        path: "/auth",
        element: <Auth />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/link/:id",
        element: <Link />
      },
      {
        path: "/:id",
        element: <RedirectLink />
      }
    ]
  }
])

function App() {

  return (
    <URLprovider>
          <RouterProvider router={router} />
    </URLprovider>
  )
}

export default App
