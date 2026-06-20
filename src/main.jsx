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
import Resumes from './pages/Resumes.jsx'
import Profile from './pages/Profile.jsx'
import Jobs from './pages/Jobs.jsx'
import JobDetails from './components/jobs/JobDetails.jsx'
import EditResume from './components/resumes/EditResume.jsx'
import Protected from './components/layout/AuthLayout.jsx'
import Home from './pages/Home.jsx'
import EditJob from './components/jobs/EditJob.jsx'
import AiAnalysis from './pages/AiAnalysis.jsx'
import Analysis from './components/ai/Analysis.jsx'

const router= createBrowserRouter(
  [
    {
    path: "/",
    element : <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
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
        path: "dashboard",
        element: (<Protected authentication>
          <Dashboard/>
        </Protected>)
      },
      {
        path: "resumes",
        element: (<Protected authentication>
          <Resumes/>
        </Protected>)
      },
      {
        path: "profile",
        element: (<Protected authentication>
          <Profile/>
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
        path: "jobs/edit/:jobId",
        element: (<Protected authentication>
          <EditJob/>
        </Protected>)
      },
      {
        path: "resumes/edit/:resumeId",
        element: (<Protected authentication>
          <EditResume/>
        </Protected>)
      },
      {
        path: "resumes/ai-analysis/:resumeId",
        element: (<Protected authentication>
          <Analysis/>
        </Protected>)
      },
      {
        path: "ai-analysis",
        element: (<Protected authentication>
          <AiAnalysis/>
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
