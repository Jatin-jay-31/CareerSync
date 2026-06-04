import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/store'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Settings from './pages/Settings.jsx'
import Resumes from './pages/Resumes.jsx'
import Jobs from './pages/Jobs.jsx'
import JobDetails from './pages/JobDetails.jsx'
import ResumeDetails from './pages/ResumeDetails.jsx'
import Protected from './components/layout/AuthLayout.js'

const router= createBrowserRouter(
  [
    {
    path: "/",
    element : <App/>,
    children: [
      {
        path: "/",
        element: <Dashboard/>
      },
      {
        path: "login",
        element: (<Protected authentication={false}>
          <Login/>
        </Protected>)
      },
      {
        path: "signup",
        element: (<Protected authentication={false}>
          <Signup/>
        </Protected>)
      },
      {
        path: "resumes",
        element: (<Protected authentication>
          <Resumes/>
        </Protected>)
      },
      {
        path: "settings",
        element: (<Protected authentication>
          <Settings/>
        </Protected>)
      },
      {
        path: "jobs",
        element: (<Protected authentication>
          <Jobs/>
        </Protected>)
      },
      {
        path: "jobs/:jobId",
        element: (<Protected authentication>
          <JobDetails/>
        </Protected>)
      },
      {
        path: "resumes/:resumeId",
        element: (<Protected authentication>
          <ResumeDetails/>
        </Protected>)
      },

    ]
  }

  ])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
)
