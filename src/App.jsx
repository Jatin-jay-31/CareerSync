import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Footer } from './components/index'
import Container from './components/layout/Container'
import { Toaster } from "react-hot-toast"
import { logoutUser } from './redux/thunks/authThunks'
import { auth } from './services/firebase'
import { onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    
    // 🔥 THIS IS THE FIX (SESSION ONLY LOGIN)
    setPersistence(auth, browserSessionPersistence)

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: "auth/loginUser/fulfilled",
          payload: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          }
        })
      } else {
        dispatch(logoutUser())
      }

      setLoading(false)
    })

    return () => unsubscribe()

  }, [dispatch])

  return !loading ? (
    <>
      <Toaster position="top-center" />
      <Container>
        <div className="flex items-center flex-col">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </Container>
    </>
  ) : null
}

export default App