import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'
import Selfanalysis from './components/Selfanalysis/Selfanalysis.jsx'
import Leaderboard from './components/Leaderboard/Leaderboard.jsx'
import Logout from './components/Logout/Logout.jsx'
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children : [
      {
        path: "",
        element: <App />
      },
      {
        path: "signup",
        element: <Signup />
      }, 
      {
        path: "login",
        element: <Login />
      },
      {
        path: "selfanalysis",
        element: <Selfanalysis />
      }, 
      {
        path: "leaderboard",
        element: <Leaderboard />
      },
      {
        path: "logout",
        element: <Logout />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>
)