import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './pages/header/Header'
import Footer from './pages/footer/Footer'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  async function checkUser() {
    try {
      await axios.get('/users/check')
    } catch (error) {
      console.log(error.response)
      navigate('/login')
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  // Show Header only on /login and /register
  const showHeader =
    location.pathname === '/login' || location.pathname === '/register'
     const showFooter =
       location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
      {showHeader && <Header />}

      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  )
}

export default App
