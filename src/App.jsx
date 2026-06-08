import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Header,Footer } from './components/index'
import Container from  './components/layout/Container'
import { Toaster } from "react-hot-toast"
import { currentUser, loginUser, logoutUser } from './redux/thunks/authThunks'

function App() {
  const [loading,setLoading]=useState(true)
  const authStatus= useSelector((state)=> state.auth.status)
  const dispatch= useDispatch()

useEffect(() => {

  let isMounted = true

  const init = async () => {

    try {

      const userData = await dispatch(currentUser)

      if (!isMounted) return

      if (userData) {

        const safeData = {
          $id: userData.$id,
          email: userData.email
        }

        dispatch(
          loginUser({
            userData: safeData
          })
        )

      } else {
        dispatch(logoutUser())
      }

    } catch (err) {

      dispatch(logoutUser())

    } finally {

      if (isMounted) {
        setLoading(false)
      }

    }
  }

  init()

  return () => {
    isMounted = false
  }

}, [])

  return !loading ? (
    <>
    <Toaster position="top-center" />
      <Container>
      <div className="flex items-center flex-col " >
        <Header />
        <Outlet/>
        <Footer/>
        </div>
      </Container>
    </>
  ) : null
}

export default App