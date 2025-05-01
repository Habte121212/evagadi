import React, { useRef, useState } from 'react'
import axios from '../../AxiosConfig'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'
import Header from '../header/Header'
import './login.css'

function Login() {
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const emailValue = emailRef.current.value
    const passwordValue = passwordRef.current.value

    if (!emailValue || !passwordValue) {
      toast.warn('Please provide all required information')
      setLoading(false)
      return
    }

    try {
      const response = await axios.post('/users/login', {
        email: emailValue,
        password: passwordValue,
      })
      toast.success('Login successful!')
      localStorage.setItem('token', response.data.token)
      console.log(response.data)
      navigate('/dashboard') // Navigate to another page after login
    } catch (error) {
      toast.error('Login failed. Please check your credentials.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <section className="loginWrapper">
        <div className="loginLeft">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              required
              className="loginInput"
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              required
              className="loginInput"
            />
            <button className="loginButton" type="submit" disabled={loading}>
              {loading ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                'Log In'
              )}
            </button>
            <button
              className="loginRegisterButton"
              type="button"
              onClick={() => navigate('/register')}
            >
              {loading ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                'Create a New Account'
              )}
            </button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        <div className="loginRight">
          <div className="loginimg">
            <img src="/evadadilogin.png" alt="Login Visual" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
